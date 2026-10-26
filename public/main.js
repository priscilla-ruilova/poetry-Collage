let editName = document.getElementsByClassName("editName")
let deleteLine = document.getElementsByClassName("remove");

Array.from(editName).forEach(function(element) {
      element.addEventListener('click', function(){
        const lineId = element.dataset.lineId
        console.log(lineId)
        fetch('lines', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            lineId,
          })
        })
        .then(response => {
          if (response.ok) return response.json()
        })
        .then(data => {
          console.log(data)
          element.closest('.line').querySelector('.nameSpan').textContent = 'anonymous';
          console.log(element.closest('.line').querySelector('.nameSpan').textContent)
        //   window.location.reload(true)
        })
      });
});


Array.from(deleteLine).forEach(function(element) {
      element.addEventListener('click', function (event){
        const lineId = event.target.dataset.lineId
        fetch('/line', {
          method: 'delete',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            lineId,
          })
        })
        .then(function (response) {
          window.location.reload()
        })
      });
});
