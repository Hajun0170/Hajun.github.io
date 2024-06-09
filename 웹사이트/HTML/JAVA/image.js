const memoForm = document.getElementById("memo-form");
const memoInput = document.getElementById("memo-input");
const imageInput = document.getElementById("image-input"); // 이미지 업로드 필드 추가
const memoList = document.getElementById("memo-list");

const memos = JSON.parse(localStorage.getItem("memos")) || [];

renderMemos();

memoForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const memoContent = memoInput.value.trim();

    if (memoContent) {
        const memo = {
            id: Date.now(),
            content: memoContent,
        };

        // 이미지 업로드 필드에서 선택한 이미지를 데이터 URL로 변환하여 메모 객체에 추가
        const imageFile = imageInput.files[0];
        if (imageFile) {
            const reader = new FileReader();
            reader.onload = function (event) {
                memo.image = event.target.result;
                memos.push(memo);
                saveMemos();
                memoInput.value = "";
                renderMemos();
            };
            reader.readAsDataURL(imageFile);
        } else {
            memos.push(memo);
            saveMemos();
            memoInput.value = "";
            renderMemos();
        }
    }
});

memoList.addEventListener("click", function (e) {
    if (e.target.classList.contains("delete-button")) {
        const memoId = parseInt(e.target.parentElement.parentElement.dataset.id);
        memos.splice(memos.findIndex((memo) => memo.id === memoId), 1);
        saveMemos();
        renderMemos();
    }
});

function renderMemos() {
    memoList.innerHTML = "";

    if (memos.length === 0) {
        memoList.innerHTML = "<li>저장된 메모가 없습니다.</li>";
        return;
    }

    memos.forEach((memo) => {
        const memoItem = document.createElement("li");
        memoItem.classList.add("memo-item");
        memoItem.dataset.id = memo.id;

        const memoContent = document.createElement("div");
        memoContent.classList.add("memo-content");
        memoContent.textContent = memo.content;

        // 이미지 링크 추가
        if (memo.image) {
            const imageLink = document.createElement("a");
            imageLink.href = memo.image;
            imageLink.textContent = "이미지 보기";
            imageLink.target = "_blank"; // 새 창에서 열기
            memoContent.appendChild(imageLink);
        }

        const memoActions = document.createElement("div");
        memoActions.classList.add("memo-actions");

        const deleteButton = document.createElement("span");
        deleteButton.classList.add("delete-button");
        deleteButton.textContent = "제거";

        memoActions.appendChild(deleteButton);
        memoItem.appendChild(memoContent);
        memoItem.appendChild(memoActions);
        memoList.appendChild(memoItem);
    });
}

function saveMemos() {
    localStorage.setItem("memos", JSON.stringify(memos));
}