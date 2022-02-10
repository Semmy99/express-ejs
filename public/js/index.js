$(document).ready(function () {
  $(".remove").click(function () {
    const id = $(this).closest('.card').attr("data-book-id");
    console.log('xczx');
    if (id) {
      fetch(`/api/books/${id}`, {
        method: 'DELETE',
      })
        .then(res => {
          document.location.reload();
        })
        .catch(res => {
          console.log("somethink went wrong");
        })
    }
  });

  $("#form").submit(function (e) {
    e.preventDefault();
  });

});

async function setAction(key = 'create') {
  try {
    const data = $('#form').serializeArray();
    if (key === "create") {
      const randomId = Math.random().toString(16).slice(2, 10);
      const formElement = document.getElementById("form")
      const formData = new FormData(formElement);
      formData.append("id", randomId);
      for (const name in data) {
        formData.append(data[name].name, data[name].value);
      }

      const response = await fetch('/api/books/', {
        method: 'POST',
        body: formData
      });
      const result = await response.json();
      document.location.href = "/";
      return false;
    }
    const formElement = document.getElementById("form")
    const formData = new FormData(formElement);
    const id = window.location.pathname;
    if (id.split("/").length < 2) {
      console.log("ERROR id", id);
      return
    }

    const response = await fetch(`/api/books${id}`, {
      method: 'PUT',
      body: formData
    });
    console.log("response", response, id);
    const result = await response?.json();
    console.log('Успех:', JSON?.stringify(result));
    return false;
  } catch (error) {
    console.error('error:', error);
  }

}
