import { useRef, useState } from "react";
import type { ChangeEvent } from "react";
import "./AuthPage.css";

function AuthProfile() {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (!file) {
            return;
        }

        const imageUrl = URL.createObjectURL(file);
        setPreviewUrl(imageUrl);
    };

    return (
        <div className="auth-page">
            <header className="auth-header">
                <div className="auth-brand">
                    <span className="auth-brand-circle" />
                    <span>Brace</span>
                </div>
            </header>

            <main>
                <section className="profile-intro">
                    <h2>프로필 설정 (1/4)</h2>
                    <p>프로필 이미지를 등록해 보세요.</p>

                    <div className="profile-steps">
                        <button className="active" type="button">
                            1/4
                        </button>
                        <button type="button">2/4</button>
                        <button type="button">3/4</button>
                        <button type="button">4/4</button>
                    </div>
                </section>

                <section className="profile-image-section">
                    <div className="profile-image-info">
                        <button
                            className="profile-avatar-button"
                            type="button"
                            onClick={handleUploadClick}
                            aria-label="프로필 이미지 업로드"
                        >
                            {previewUrl ? (
                                <img src={previewUrl} alt="선택한 프로필 미리보기" />
                            ) : (
                                <span>+</span>
                            )}
                        </button>

                        <div>
                            <h3>프로필 이미지</h3>

                            <button
                                className="profile-upload-button"
                                type="button"
                                onClick={handleUploadClick}
                            >
                                사진 업로드
                            </button>

                            <p>사진은 나중에 마이페이지에서 변경할 수 있어요.</p>
                        </div>
                    </div>

                    <div className="profile-action-buttons">
                        <button className="profile-later-button" type="button">
                            나중에
                        </button>

                        <button className="auth-dark-button" type="button">
                            다음
                        </button>
                    </div>

                    <input
                        ref={fileInputRef}
                        className="profile-file-input"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                </section>
            </main>

            <footer className="auth-footer">
                <span>© Brace</span>
                <span>이용약관</span>
                <span>개인정보 처리방침</span>
            </footer>
        </div>
    );
}

export default AuthProfile;