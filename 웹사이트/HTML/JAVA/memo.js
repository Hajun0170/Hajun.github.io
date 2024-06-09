// 필요한 요소들을 변수로 참조
const memoForm = document.getElementById("memo-form");
const memoInput = document.getElementById("memo-input");
const imageInput = document.getElementById("image-input");
const memoList = document.getElementById("memo-list");

// 로컬 스토리지에서 메모를 가져옴, 없을 경우 빈 배열로 초기화
const memos = JSON.parse(localStorage.getItem("memos0")) || [];

// 페이지 로드 시 메모를 렌더링
renderMemos();

// 메모 추가 이벤트 리스너
memoForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const memoContent = memoInput.value.trim();
    const imageFile = imageInput.files[0]; // 이미지 파일 가져오기

    if (memoContent) {
        // 메모 객체 생성
        const memo = {
            id: Date.now(),
            content: memoContent,
            image: imageFile ? URL.createObjectURL(imageFile) : null, // 이미지 URL 생성
        };

        // 메모 배열에 추가
        memos.push(memo);

        // 메모를 로컬 스토리지에 저장
        saveMemos();

        // 입력 필드 초기화
        memoInput.value = "";
        imageInput.value = null;

        // 메모를 다시 렌더링
        renderMemos();
    }
});

// 메모 삭제 이벤트 리스너
memoList.addEventListener("click", function (e) {
    if (e.target.classList.contains("delete-button")) {
        const memoId = parseInt(
            e.target.parentElement.parentElement.dataset.id
        );

        // 메모 배열에서 해당 메모를 삭제
        memos.splice(
            memos.findIndex((memo) => memo.id === memoId),
            1
        );

        // 메모를 로컬 스토리지에 저장
        saveMemos();

        // 메모를 다시 렌더링
        renderMemos();
    }
});

// 페이지에 메모를 렌더링
function renderMemos() {
    memoList.innerHTML = "";

    if (memos.length === 0) {
        memoList.innerHTML = "<li>저장된 내용이 없습니다. </li>";
        return;
    }

    memos.forEach((memo) => {
        const memoItem = document.createElement("li");
        memoItem.classList.add("memo-item");
        memoItem.dataset.id = memo.id;

        const memoContent = document.createElement("div");
        memoContent.classList.add("memo-content");
        memoContent.textContent = memo.content;

        // 이미지 링크
        if (memo.image) {
            const image = document.createElement("img");
            
            image.src = memo.image;
            image.alt = "메모 이미지";
            memoContent.appendChild(image);
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

// 메모를 로컬 스토리지에 저장
function saveMemos() {
    localStorage.setItem("memos0", JSON.stringify(memos));
}


      

      