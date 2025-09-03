#!/usr/bin/env python3
"""
이미지 최적화 스크립트
대용량 이미지를 웹용으로 최적화합니다.
"""

import os
from PIL import Image
import sys

def optimize_image(input_path, output_path, max_width=800, quality=85):
    """이미지 최적화 함수"""
    try:
        with Image.open(input_path) as img:
            # EXIF 정보를 이용해 회전된 이미지 보정
            if hasattr(img, '_getexif') and img._getexif() is not None:
                orientation = img._getexif().get(274, 1)
                if orientation == 3:
                    img = img.rotate(180, expand=True)
                elif orientation == 6:
                    img = img.rotate(270, expand=True)
                elif orientation == 8:
                    img = img.rotate(90, expand=True)
            
            # 이미지 크기 조정
            if img.width > max_width:
                ratio = max_width / img.width
                new_height = int(img.height * ratio)
                img = img.resize((max_width, new_height), Image.Resampling.LANCZOS)
            
            # RGB 모드로 변환 (JPEG 저장용)
            if img.mode in ('RGBA', 'P', 'L'):
                background = Image.new('RGB', img.size, (255, 255, 255))
                if img.mode == 'P':
                    img = img.convert('RGBA')
                background.paste(img, mask=img.split()[-1] if img.mode == 'RGBA' else None)
                img = background
            
            # 최적화된 JPEG로 저장
            img.save(output_path, 'JPEG', quality=quality, optimize=True, progressive=True)
            
            # 파일 크기 정보
            original_size = os.path.getsize(input_path)
            optimized_size = os.path.getsize(output_path)
            reduction = (1 - optimized_size/original_size) * 100
            
            print(f"✅ {os.path.basename(input_path)}")
            print(f"   원본: {original_size/1024/1024:.1f}MB → 최적화: {optimized_size/1024:.0f}KB ({reduction:.1f}% 감소)")
            return True
            
    except Exception as e:
        print(f"❌ {input_path} 처리 실패: {e}")
        return False

def main():
    """메인 함수"""
    
    # 필요한 디렉토리가 있는지 확인
    gallery_input = "images/"
    gallery_output = "assets/images/gallery/"
    header_output = "assets/images/header/"
    
    if not os.path.exists(gallery_input):
        print(f"❌ 입력 디렉토리가 없습니다: {gallery_input}")
        return
    
    # 출력 디렉토리 생성
    os.makedirs(gallery_output, exist_ok=True)
    os.makedirs(header_output, exist_ok=True)
    
    print("🖼️  이미지 최적화 시작...")
    print("=" * 50)
    
    # 갤러리 이미지 처리
    image_files = [f for f in os.listdir(gallery_input) if f.lower().endswith(('.jpg', '.jpeg', '.png'))]
    image_files.sort()
    
    success_count = 0
    
    for i, filename in enumerate(image_files[:12], 1):  # 최대 12개 이미지
        input_path = os.path.join(gallery_input, filename)
        output_filename = f"photo-{i:02d}.jpg"
        output_path = os.path.join(gallery_output, output_filename)
        
        if optimize_image(input_path, output_path, max_width=800, quality=85):
            success_count += 1
    
    # 헤더 이미지 처리 (첫 번째 이미지 사용)
    if image_files:
        header_input = os.path.join(gallery_input, image_files[0])
        header_output_path = os.path.join(header_output, "main-header.jpg")
        if optimize_image(header_input, header_output_path, max_width=600, quality=90):
            print(f"✅ 헤더 이미지 생성: main-header.jpg")
    
    print("=" * 50)
    print(f"🎉 완료! {success_count}개 이미지 최적화 성공")
    print("\n📝 사용법:")
    print("1. 브라우저에서 index.html 또는 test.html을 열어보세요")
    print("2. 이미지가 빠르게 로드되는 것을 확인하세요")

if __name__ == "__main__":
    try:
        import PIL
    except ImportError:
        print("❌ Pillow 라이브러리가 필요합니다.")
        print("설치: pip install Pillow")
        sys.exit(1)
    
    main()