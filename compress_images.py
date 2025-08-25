#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
이미지 압축 스크립트
웨딩 사이트 이미지들을 자동으로 압축합니다.
"""

import os
import sys
from PIL import Image
import glob

def compress_image(input_path, output_path, max_width=1200, max_height=800, quality=85):
    """이미지를 압축하고 크기를 조정합니다."""
    try:
        with Image.open(input_path) as img:
            # 이미지 모드 확인 및 변환
            if img.mode in ('RGBA', 'LA', 'P'):
                img = img.convert('RGB')
            
            # 원본 크기
            original_width, original_height = img.size
            
            # 비율 유지하면서 크기 조정
            if original_width > max_width or original_height > max_height:
                ratio = min(max_width / original_width, max_height / original_height)
                new_width = int(original_width * ratio)
                new_height = int(original_height * ratio)
                img = img.resize((new_width, new_height), Image.Resampling.LANCZOS)
            
            # 압축된 이미지 저장
            img.save(output_path, 'JPEG', quality=quality, optimize=True)
            
            # 파일 크기 정보
            original_size = os.path.getsize(input_path)
            compressed_size = os.path.getsize(output_path)
            compression_ratio = (1 - compressed_size / original_size) * 100
            
            print(f"✅ {os.path.basename(input_path)}")
            print(f"   크기: {original_width}x{original_height} → {img.size[0]}x{img.size[1]}")
            print(f"   용량: {original_size/1024/1024:.1f}MB → {compressed_size/1024/1024:.1f}MB")
            print(f"   압축률: {compression_ratio:.1f}%")
            print()
            
            return True
            
    except Exception as e:
        print(f"❌ {input_path} 압축 실패: {e}")
        return False

def main():
    """메인 함수"""
    print("🎉 웨딩 사이트 이미지 압축을 시작합니다!")
    print("=" * 50)
    
    # images 폴더 경로
    images_dir = "images"
    compressed_dir = "images/compressed"
    
    # 압축된 이미지 저장 폴더 생성
    if not os.path.exists(compressed_dir):
        os.makedirs(compressed_dir)
        print(f"📁 {compressed_dir} 폴더를 생성했습니다.")
    
    # 이미지 파일 찾기
    image_extensions = ['*.jpg', '*.jpeg', '*.JPG', '*.JPEG']
    image_files = []
    
    for ext in image_extensions:
        image_files.extend(glob.glob(os.path.join(images_dir, ext)))
    
    if not image_files:
        print("❌ images 폴더에서 이미지를 찾을 수 없습니다.")
        return
    
    print(f"📸 총 {len(image_files)}개의 이미지를 발견했습니다.")
    print()
    
    # 각 이미지 압축
    success_count = 0
    total_original_size = 0
    total_compressed_size = 0
    
    for image_path in image_files:
        filename = os.path.basename(image_path)
        output_path = os.path.join(compressed_dir, filename)
        
        # 원본 파일 크기
        original_size = os.path.getsize(image_path)
        total_original_size += original_size
        
        # 이미지 압축
        if compress_image(image_path, output_path):
            success_count += 1
            compressed_size = os.path.getsize(output_path)
            total_compressed_size += compressed_size
    
    # 결과 요약
    print("=" * 50)
    print("🎯 압축 완료!")
    print(f"✅ 성공: {success_count}/{len(image_files)}")
    print(f"📊 전체 용량: {total_original_size/1024/1024:.1f}MB → {total_compressed_size/1024/1024:.1f}MB")
    print(f"🚀 전체 압축률: {(1 - total_compressed_size / total_original_size) * 100:.1f}%")
    print()
    print("💡 다음 단계:")
    print("1. images/compressed 폴더의 압축된 이미지들을 확인하세요")
    print("2. 만족스럽다면 기존 이미지들을 백업하고 압축된 이미지로 교체하세요")
    print("3. 웹사이트 로딩 속도가 훨씬 빨라질 것입니다!")

if __name__ == "__main__":
    main()

