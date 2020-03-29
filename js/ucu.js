// 1. Submit the form, only if it is valid
//    email is between 5 and 50 chars long
//    email format is correct
//    name has 0 or 2 whitespaces benween words
//    name length is 1 or more chars
//    phone length is 12 or more digits
//    phone format is correct. Valid formats: "+38032 000 000 00", "+380(32) 000 000 00", "+380(32)-000-000-00", "0380(32) 000 000 00", + any combitaion
//    message is 10 or more characters.
//    message must not iclude bad language: ugly, dumm, stupid, pig, ignorant
// 2. Validate each input on the fly using onchange event
// 3. Define re-usable validators: length, format,  
function validateMe(event) {
  event.preventDefault();

  return name_valid() && phone_valid() && email_valid() && message_valid();
}

function name_valid() {
  let errors_list = [];
  let nameNode = event.target.elements['name'];

  let result = true;

  if (nameNode.length === 0) {
    result = false;
    errors_list.push('Name empty');
  }
  if (!nameNode.value.match(/^\w+$/) && !nameNode.value.match(/^\w+\s+\w+\s+\w+$/)) {
    result = false;
    errors_list.push('Incorrect name format');
  }

  error_handling(nameNode, errors_list);
  return result;
}

function phone_valid() {
  let errors_list = [];
  let phoneNode = event.target.elements['phone'];

  let result = true;

  if (phoneNode.value.replace(/[^0-9]/gi, '').length < 12) {
    result = false;
    errors_list.push('Number too short');
  }
  if (!phoneNode.value.match(/^[0+]\d{3}(\(\d{2}\)|\d{2})([ -]?\d{3}){2}[ -]?\d{2}$/)) {
    result = false
    errors_list.push('Incorrect number format');
  }

  error_handling(phoneNode, errors_list);
  return result;
}

function email_valid() {
  let errors_list = [];
  let emailNode = event.target.elements['email'];

  let result = true;

  if (emailNode.value.length < 5) {
    result = false;
    errors_list.push('Email too short');
  }
  if (emailNode.value.length > 50) {
    result = false;
    errors_list.push('Email too long');
  }
  if (!emailNode.value.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
    result = false;
    errors_list.push('Email format incorrect');
}

  error_handling(emailNode, errors_list);
  return result;
}

function message_valid() {
  let errors_list = [];
  let messageNode = event.target.elements['message'];

  let result = true;

  if (messageNode.value.length < 10) {
    result = false;
    errors_list.push("Message too short");
  }

  const bad_words = ['ugly', 'dumb', 'stupid', 'pig', 'ignorant'];
  for (let word of bad_words) {
    if (messageNode.value.toLowerCase().includes(word)) {
        result = false;
        errors_list.push("Message contains word \"" + word + "\"");
    }
}

  error_handling(messageNode, errors_list);
  return result;
}

function error_handling(valueNode, errors_list) {
  const valueErrorNode = valueNode.parentNode.querySelector('p.help-block');
  valueErrorNode.innerHTML = '';
  let valueErrors = document.createElement('ul');
  valueErrors.setAttribute('role', 'alert');

  if (errors_list.length === 0) return;

  for (let error of errors_list) {
    let li = document.createElement('li');
    li.innerText = error;
    valueErrors.appendChild(li);
  }

  valueErrorNode.appendChild(valueErrors);
}
