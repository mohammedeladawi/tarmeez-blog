function postsUI(posts) {
  const postsDiv = document.querySelector(".posts");
  postsDiv.innerHTML = "";

  for (let post of posts) {
    postsDiv.innerHTML += `
        <div class="post card my-3 shadow">
            <div class="card-header">
              <img
                class="profile rounded-circle"
                src=${post.author.profile_image}
                alt="user picture"
              />
              <b>${post.author.username}</b>
            </div>
            <div class="card-body">
              <div class="post-image">
                <img class="w-100" src=${post.image} alt="post image" />
              </div>
              <h6 class="text-secondary mt-1">${post.created_at}</h6>
              <h4>${post.title || ""}</h4>
              <p>
                ${post.body}
              </p>
              <hr />
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-pen"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z"
                  />
                </svg>
                <span>(${post.comments_count}) Comments</span>
                <div id='tags w-100 d-inline-flex justify-content-end g-2'></div>
              </div>
            </div>
        </div>
`;

    // Tags
    for (let tag of post.tags) {
      document.getElementById(
        "tags"
      ).innerHTML += `<span class='tag bg-secondary py-2 px-1'>${tag}</span>`;
    }
  }
}

const baseUrl = "https://tarmeezacademy.com/api/v1";

axios
  .get(`${baseUrl}/posts`)
  .then((response) => postsUI(response.data.data))
  .catch((err) => console.log(err.response.data.message));

const handleLogin = () => {
  const username = document.querySelector("#username").value;
  const password = document.querySelector("#password").value;

  const body = { username, password };
  axios
    .post(`${baseUrl}/login`, body)
    .then((response) => console.log(response.data))
    .catch((err) => console.log(err.response.data.errors));
};
