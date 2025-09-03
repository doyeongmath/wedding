#!/usr/bin/env python3
"""
HTML 파일의 이미지 경로를 압축된 이미지로 자동 업데이트
"""

import os
import re

def update_html_paths():
    """HTML 파일의 이미지 경로 업데이트"""
    
    html_file = "index.html"
    
    if not os.path.exists(html_file):
        print(f"❌ {html_file} 파일을 찾을 수 없습니다.")
        return False
    
    # 백업 생성
    backup_file = "index_backup.html"
    with open(html_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    with open(backup_file, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"📄 백업 파일 생성: {backup_file}")
    
    # 경로 교체
    # compressed/ -> optimized/
    updated_content = content.replace('src="compressed/', 'src="optimized/')
    
    # 변경사항이 있는지 확인
    changes_made = content != updated_content
    
    if changes_made:
        # 업데이트된 내용 저장
        with open(html_file, 'w', encoding='utf-8') as f:
            f.write(updated_content)
        
        # 변경된 항목 개수 확인
        old_paths = re.findall(r'src="compressed/[^"]*"', content)
        new_paths = re.findall(r'src="optimized/[^"]*"', updated_content)
        
        print(f"✅ HTML 업데이트 완료!")
        print(f"📝 변경된 이미지 경로: {len(old_paths)}개")
        
        for i, (old, new) in enumerate(zip(old_paths, new_paths), 1):
            print(f"   {i:2d}. {old} → {new}")
            
    else:
        print("ℹ️  변경할 경로가 없습니다. (이미 optimized/ 경로를 사용 중)")
    
    return changes_made

def check_optimized_folder():
    """optimized 폴더의 이미지 파일 확인"""
    optimized_dir = "optimized"
    
    if not os.path.exists(optimized_dir):
        print(f"⚠️  {optimized_dir} 폴더가 없습니다.")
        print("먼저 compress_images_simple.py를 실행하여 이미지를 압축하세요.")
        return False
    
    # 이미지 파일 목록
    image_files = [f for f in os.listdir(optimized_dir) 
                   if f.lower().endswith(('.jpg', '.jpeg'))]
    
    if not image_files:
        print(f"⚠️  {optimized_dir} 폴더에 압축된 이미지가 없습니다.")
        return False
    
    print(f"✅ {optimized_dir} 폴더에서 {len(image_files)}개 이미지 발견:")
    
    total_size = 0
    for img_file in sorted(image_files):
        file_path = os.path.join(optimized_dir, img_file)
        file_size = os.path.getsize(file_path)
        total_size += file_size
        print(f"   📸 {img_file}: {file_size/1024:.0f}KB")
    
    print(f"📦 총 크기: {total_size/1024:.0f}KB ({total_size/1024/1024:.1f}MB)")
    
    return True

def main():
    """메인 함수"""
    print("🔧 HTML 경로 자동 업데이트 도구")
    print("=" * 50)
    
    # 1. optimized 폴더 확인
    print("1. 압축된 이미지 폴더 확인...")
    if not check_optimized_folder():
        input("\n❌ 아무 키나 눌러서 종료...")
        return
    
    print("\n2. HTML 파일 경로 업데이트...")
    success = update_html_paths()
    
    if success:
        print("\n🎉 모든 작업이 완료되었습니다!")
        print("\n📝 다음 단계:")
        print("1. 브라우저에서 index.html을 새로고침하세요")
        print("2. 이미지가 빠르게 로드되는지 확인하세요")
        print("3. 모든 12개 갤러리 이미지를 확인하세요")
        
    else:
        print("\n✅ 설정이 이미 최신 상태입니다.")
    
    input("\n🎯 아무 키나 눌러서 종료...")

if __name__ == "__main__":
    main()