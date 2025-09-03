#!/usr/bin/env python3
"""
간단한 이미지 압축 스크립트
19-26MB 이미지를 200KB 이하로 압축
"""

import os
import sys
from pathlib import Path

def compress_images():
    """이미지 압축 함수"""
    try:
        from PIL import Image, ImageOps
        print("✅ Pillow 라이브러리 발견!")
    except ImportError:
        print("❌ Pillow가 설치되지 않았습니다.")
        print("설치: pip install Pillow")
        print("또는: py -m pip install Pillow")
        return False
    
    # 디렉토리 설정
    input_dir = "compressed"  # 파일명이 정리된 폴더
    output_dir = "optimized"  # 압축된 이미지 저장 폴더
    
    if not os.path.exists(input_dir):
        print(f"❌ {input_dir} 폴더를 찾을 수 없습니다.")
        return False
    
    # 출력 디렉토리 생성
    os.makedirs(output_dir, exist_ok=True)
    print(f"📁 {output_dir} 폴더 생성 완료")
    
    print("🖼️  이미지 압축 시작...")
    print("=" * 60)
    
    # 이미지 파일 찾기
    image_files = []
    for ext in ['*.jpg', '*.jpeg', '*.JPG', '*.JPEG']:
        image_files.extend(Path(input_dir).glob(ext))
    
    if not image_files:
        print(f"❌ {input_dir} 폴더에 이미지 파일이 없습니다.")
        return False
    
    success_count = 0
    total_original_size = 0
    total_compressed_size = 0
    
    for img_path in sorted(image_files):
        try:
            # 원본 파일 크기
            original_size = img_path.stat().st_size
            total_original_size += original_size
            
            # 이미지 열기
            with Image.open(img_path) as img:
                # EXIF 정보 기반 회전 보정
                img = ImageOps.exif_transpose(img)
                
                # RGB 모드로 변환 (JPEG 저장용)
                if img.mode in ('RGBA', 'P', 'LA'):
                    # 흰색 배경으로 변환
                    background = Image.new('RGB', img.size, (255, 255, 255))
                    if img.mode in ('RGBA', 'LA'):
                        background.paste(img, mask=img.split()[-1] if img.mode == 'RGBA' else None)
                    else:
                        background.paste(img)
                    img = background
                elif img.mode != 'RGB':
                    img = img.convert('RGB')
                
                # 크기 조정 (웹용 최적화)
                max_width = 800
                if img.width > max_width:
                    ratio = max_width / img.width
                    new_height = int(img.height * ratio)
                    img = img.resize((max_width, new_height), Image.Resampling.LANCZOS)
                
                # 출력 파일 경로
                output_path = Path(output_dir) / img_path.name
                
                # 고품질 JPEG로 저장 (progressive + optimize)
                img.save(
                    output_path, 
                    'JPEG', 
                    quality=85,
                    optimize=True,
                    progressive=True
                )
                
                # 압축된 파일 크기
                compressed_size = output_path.stat().st_size
                total_compressed_size += compressed_size
                
                # 압축률 계산
                reduction = (1 - compressed_size/original_size) * 100
                
                print(f"✅ {img_path.name}")
                print(f"   {original_size/1024/1024:.1f}MB → {compressed_size/1024:.0f}KB ({reduction:.1f}% 감소)")
                print(f"   해상도: {img.width}x{img.height}")
                
                success_count += 1
                
        except Exception as e:
            print(f"❌ {img_path.name} 압축 실패: {e}")
    
    # 결과 요약
    print("=" * 60)
    print(f"🎉 압축 완료!")
    print(f"📊 처리된 파일: {success_count}개")
    print(f"📦 전체 크기: {total_original_size/1024/1024:.1f}MB → {total_compressed_size/1024:.0f}KB")
    
    if total_original_size > 0:
        total_reduction = (1 - total_compressed_size/total_original_size) * 100
        print(f"💾 총 압축률: {total_reduction:.1f}% 감소")
    
    print(f"📁 압축된 이미지 위치: {output_dir}/ 폴더")
    print("\n📝 다음 단계:")
    print("1. index.html에서 'compressed/'를 'optimized/'로 변경")
    print("2. 브라우저에서 확인")
    
    return success_count > 0

def main():
    """메인 함수"""
    print("🔧 웨딩 사진 압축 도구")
    print("대용량 이미지(19-26MB)를 웹용(~200KB)으로 압축합니다.")
    print()
    
    success = compress_images()
    
    if success:
        print("\n✨ 모든 작업이 완료되었습니다!")
    else:
        print("\n⚠️  압축 작업 중 문제가 발생했습니다.")
    
    input("\n🎯 아무 키나 눌러서 종료...")

if __name__ == "__main__":
    main()