#!/usr/bin/env python3
"""
이미지 압축 및 최적화 스크립트
대용량 이미지를 웹용으로 압축합니다.
"""

import os
import sys
from pathlib import Path

def compress_with_ffmpeg():
    """FFmpeg를 사용한 이미지 압축"""
    print("🖼️  FFmpeg를 사용한 이미지 압축 시작...")
    
    input_dir = "images"
    output_dir = "compressed"
    
    if not os.path.exists(input_dir):
        print(f"❌ {input_dir} 폴더가 없습니다.")
        return False
        
    os.makedirs(output_dir, exist_ok=True)
    
    # 이미지 파일 목록
    image_files = [f for f in os.listdir(input_dir) if f.lower().endswith(('.jpg', '.jpeg'))]
    image_files.sort()
    
    success_count = 0
    
    for i, filename in enumerate(image_files[:12], 1):
        input_path = os.path.join(input_dir, filename)
        output_filename = f"photo-{i:02d}.jpg"
        output_path = os.path.join(output_dir, output_filename)
        
        # FFmpeg 명령어: 800px 폭으로 리사이즈, 품질 85
        cmd = f'ffmpeg -i "{input_path}" -vf "scale=800:-1" -q:v 3 -y "{output_path}"'
        
        print(f"처리 중: {filename} -> {output_filename}")
        result = os.system(cmd)
        
        if result == 0 and os.path.exists(output_path):
            # 크기 비교
            original_size = os.path.getsize(input_path) / 1024 / 1024
            compressed_size = os.path.getsize(output_path) / 1024
            reduction = (1 - (compressed_size/1024)/original_size) * 100
            
            print(f"✅ 성공: {original_size:.1f}MB → {compressed_size:.0f}KB ({reduction:.1f}% 감소)")
            success_count += 1
        else:
            print(f"❌ 실패: {filename}")
    
    print(f"\n🎉 완료! {success_count}개 이미지 압축 성공")
    return success_count > 0

def compress_with_imagemagick():
    """ImageMagick을 사용한 이미지 압축"""
    print("🖼️  ImageMagick을 사용한 이미지 압축 시작...")
    
    input_dir = "images"
    output_dir = "compressed"
    
    os.makedirs(output_dir, exist_ok=True)
    
    image_files = [f for f in os.listdir(input_dir) if f.lower().endswith(('.jpg', '.jpeg'))]
    image_files.sort()
    
    success_count = 0
    
    for i, filename in enumerate(image_files[:12], 1):
        input_path = os.path.join(input_dir, filename)
        output_filename = f"photo-{i:02d}.jpg"
        output_path = os.path.join(output_dir, output_filename)
        
        # ImageMagick 명령어
        cmd = f'magick "{input_path}" -resize 800x -quality 85 -strip "{output_path}"'
        
        print(f"처리 중: {filename} -> {output_filename}")
        result = os.system(cmd)
        
        if result == 0 and os.path.exists(output_path):
            original_size = os.path.getsize(input_path) / 1024 / 1024
            compressed_size = os.path.getsize(output_path) / 1024
            reduction = (1 - (compressed_size/1024)/original_size) * 100
            
            print(f"✅ 성공: {original_size:.1f}MB → {compressed_size:.0f}KB ({reduction:.1f}% 감소)")
            success_count += 1
        else:
            print(f"❌ 실패: {filename}")
    
    print(f"\n🎉 완료! {success_count}개 이미지 압축 성공")
    return success_count > 0

def create_simple_copy():
    """일단 파일명 정리를 위한 단순 복사"""
    print("📁 파일명 정리 및 복사...")
    
    input_dir = "images"
    output_dir = "compressed"
    
    os.makedirs(output_dir, exist_ok=True)
    
    image_files = [f for f in os.listdir(input_dir) if f.lower().endswith(('.jpg', '.jpeg'))]
    image_files.sort()
    
    for i, filename in enumerate(image_files[:12], 1):
        input_path = os.path.join(input_dir, filename)
        output_filename = f"photo-{i:02d}.jpg"
        output_path = os.path.join(output_dir, output_filename)
        
        # 단순 복사
        try:
            import shutil
            shutil.copy2(input_path, output_path)
            print(f"✅ 복사: {filename} -> {output_filename}")
        except Exception as e:
            print(f"❌ 실패: {filename} - {e}")
    
    print("복사 완료! 이제 HTML에서 compressed/ 폴더의 이미지를 사용하세요.")

def main():
    print("🔧 이미지 압축 도구")
    print("=" * 50)
    
    # 1. FFmpeg 시도
    if os.system("ffmpeg -version > nul 2>&1") == 0:
        print("✅ FFmpeg 발견! FFmpeg로 압축합니다.")
        if compress_with_ffmpeg():
            return
    
    # 2. ImageMagick 시도  
    if os.system("magick -version > nul 2>&1") == 0:
        print("✅ ImageMagick 발견! ImageMagick으로 압축합니다.")
        if compress_with_imagemagick():
            return
    
    # 3. 둘 다 없으면 파일명만 정리
    print("⚠️  FFmpeg나 ImageMagick이 설치되지 않았습니다.")
    print("일단 파일명을 정리해서 복사합니다.")
    create_simple_copy()
    
    print("\n📝 압축 도구 설치 방법:")
    print("1. FFmpeg: https://ffmpeg.org/download.html")
    print("2. ImageMagick: https://imagemagick.org/script/download.php")

if __name__ == "__main__":
    main()