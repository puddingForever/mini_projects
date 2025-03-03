const postContainer = document.getElementById("post-container");
const loading = document.querySelector(".loader");
const filter = document.getElementById("filter");
const header = document.querySelector(".header");
const searchType = document.querySelector(".search-type");
gsap.registerPlugin(ScrollTrigger);

let limit = 5;
let page = 1;
// fetch posts from api
async function getPosts() {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
  );
  const data = await res.json();
  return data;
}

// show posts in dom
async function showPosts() {
  const posts = await getPosts();
  posts.forEach((post) => {
    const postEl = document.createElement("div");
    postEl.classList.add("post");
    postEl.innerHTML = `
      <div class="number">${post.id}</div>
      <div class="post-info">
          <h2 class="post-title">${post.title}</h2>
          <div class="post-body">${post.body}</div>
      </div>
    `;

    postContainer.appendChild(postEl);
  });

  gsap.utils.toArray(".post").forEach((selector) => {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: selector,
          start: "0% 20%",
          end: "0% 0%",
          scrub: 1,
          // markers: true,
        },
      })
      .to(
        selector,
        {
          transform: "rotateX(-60deg) scale(0.9)",
          transformOrigin: "top",
          filter: "brightness(0.3)",
        },
        0
      );
  });
}

// initial posts
showPosts();

let isLoading = false;
// show loader
function showLoading() {
  if (isLoading) return;
  isLoading = true;
  loading.classList.add("show");

  setTimeout(() => {
    loading.classList.remove("show");

    setTimeout(() => {
      page++;
      showPosts();
      isLoading = false;
    }, 300);
  }, 1000);
}

// filter post
function filterPosts(e) {
  const term = e.target.value.toUpperCase();
  const posts = document.querySelectorAll(".post");

  posts.forEach((post) => {
    const title = post.querySelector(".post-title").innerText.toUpperCase();
    const body = post.querySelector(".post-body").innerText.toUpperCase();

    if (title.indexOf(term) > -1 || body.indexOf(term) > -1) {
      post.style.display = "flex";
    } else {
      post.style.display = "none";
    }
  });
}

function orderList(e) {
  const order = e.target.value;
  const posts = Array.from(postContainer.querySelectorAll(".post"));

  if (order === "newest") {
    alert("정렬 react변환떄 추가예정 ^^ ");
  } else if (order === "oldest") {
    alert("정렬 react변환떄 추가예정 ^^ ");
  }
}
window.addEventListener("scroll", () => {
  // clientHeight : 스크롤을 포함한 전체길이
  // scrollHEight 사용자가 볼 수 있는 화면높이
  // scrollTop : 현재 스크롤위치 (얼마나 내렸는지 )
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (scrollTop === 0) {
    header.className = "header";
  } else {
    header.className = "header scroll";
  }

  if (scrollTop + clientHeight >= scrollHeight - 5) {
    showLoading();
  }
});

filter.addEventListener("input", filterPosts);

searchType.addEventListener("change", orderList);
