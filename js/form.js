/* Free-consultation request: validates, then opens WhatsApp with the details pre-filled. */
(function () {
  var form = document.getElementById('bookForm');
  if (!form) return;
  var note = document.getElementById('formNote');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var f = form.elements, bad = [];
    ['name', 'phone', 'email'].forEach(function (k) { f[k].classList.remove('invalid'); });
    if (!f.name.value.trim()) bad.push('name');
    if (f.phone.value.replace(/\D/g, '').length < 10) bad.push('phone');
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(f.email.value.trim())) bad.push('email');
    if (bad.length) {
      bad.forEach(function (k) { f[k].classList.add('invalid'); });
      note.className = 'form-note err';
      note.textContent = 'Please check your ' + bad.join(', ') + '.';
      f[bad[0]].focus();
      return;
    }
    var body = [
      '*Free 30-minute consultation request*', '',
      'Name: ' + f.name.value.trim(),
      'Company: ' + (f.company.value.trim() || '-'),
      'Phone: ' + f.phone.value.trim(),
      'Email: ' + f.email.value.trim(),
      'Interested in: ' + f.topic.value,
      'Preferred time: ' + (f.when.value.trim() || '-'),
      'Message: ' + (f.msg.value.trim() || '-')
    ].join('\n');
    note.className = 'form-note ok';
    note.textContent = 'Thank you — opening WhatsApp so you can send your request. You can also call us on +91 95038 60095.';
    window.open('https://wa.me/919503860095?text=' + encodeURIComponent(body), '_blank', 'noopener');
  });
})();
