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
      ).innerHTML += `<span class='tag bg-secondary py-2 px-1'>${tag.name}</span>`;
    }
  }
}

const baseUrl = "https://tarmeezacademy.com/api/v1";

axios
  .get(`${baseUrl}/posts`)
  .then((response) => postsUI(response.data.data))
  .catch((err) => console.log(err));

function registeredSuccessfully(data) {
  localStorage.setItem("token", data.token);
  localStorage.setItem("user", JSON.stringify(data.user));
  const bsModal = bootstrap.Modal.getInstance("#registerModal");
  bsModal.hide();

  authUI();
  showAuthAlert("Registered successfully", "success");
}

function handleRegisterBtn() {
  const username = document.querySelector("#username-register").value;
  const password = document.querySelector("#password-register").value;
  const name = document.querySelector("#name-register").value;
  const email = document.querySelector("#email-register").value;

  const body = { username, name, password, email };
  axios
    .post(`${baseUrl}/register`, body)
    .then((response) => registeredSuccessfully(response.data))
    .catch((err) => showAuthAlert(err.response.data.message, "danger"));
}

function loggedinSuccessfully(data) {
  localStorage.setItem("token", data.token);
  localStorage.setItem("user", JSON.stringify(data.user));
  const bsModal = bootstrap.Modal.getInstance("#loginModal");
  bsModal.hide();

  authUI();
  showAuthAlert("Logged in successfully", "success");
}

function handleLoginBtn() {
  const username = document.querySelector("#username-login").value;
  const password = document.querySelector("#password-login").value;

  const body = { username, password };
  axios
    .post(`${baseUrl}/login`, body)
    .then((response) => loggedinSuccessfully(response.data))
    .catch((err) => showAuthAlert(err.response.data.message, "danger"));
}

function handleLogoutBtn() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  authUI();
  showAuthAlert("Logged out successfully", "success");
}

function authUI() {
  const loginBtn = document.getElementById("login-btn");
  const logoutBtn = document.getElementById("logout-btn");

  if (localStorage.getItem("token")) {
    loginBtn.parentElement.style.display = "none";
    logoutBtn.parentElement.style.display = "block";
  } else {
    loginBtn.parentElement.style.display = "block";
    logoutBtn.parentElement.style.display = "none";
  }
}

function showAuthAlert(message, type) {
  const alertPlaceholder = document.getElementById("auth-alert");
  const appendAlert = (message, type) => {
    const wrapper = document.createElement("div");
    wrapper.innerHTML = [
      `<div class="alert alert-${type} alert-dismissible fade show" role="alert">`,
      `   <div>${message}</div>`,
      '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
      "</div>",
    ].join("");

    alertPlaceholder.append(wrapper);
  };

  appendAlert(message, type);

  setTimeout(
    () => document.querySelector("#auth-alert .btn-close").click(),
    2000
  );
}

authUI();
