function generateKey(name, address) {
  // Make sure illegal characters removed from key.
  return (`${name}, ${address}`).replace(/[^0-9a-zA-Z, ]/gi, '').trim();
}

$(document).ready( function () {
  $('#table_id').DataTable();
  var modal = document.getElementById('marketModal');
  var yes = document.getElementById('yes');
  var no = document.getElementById('no');

  window.onclick = function(event) {
    if (event.target == modal) modal.style.display = "none";
  }

  $('.dataTable').on('click', 'tbody td span', function() {
    row = {}
    $('td', $(this.parentNode.parentNode)).each(function (index, item) {
      row[index] = item.textContent;
    });

    var market = generateKey(row[0], row[1]);
    modal.style.display = "block";
    document.getElementById('market-to-delete').textContent = "Are you sure you want to delete " + market + "?";
    
    yes.onclick = function() {
      $.ajax({
        url: '/markets/' + market,
        type: 'DELETE',
        success: function(result) {
          modal.style.display = "none";
          location.href = "/markets";
        }
      });
    }
  
    no.onclick = function() {
      modal.style.display = "none";
    }
  });
});
