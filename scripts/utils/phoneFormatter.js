
/**
 * =Regular Expression to reformat a US phone number in Javascript
 * @param {*} phoneNumberString - input phone number (10 digits + country code, see examples)
 * @returns - formatted phone number string
 */
export const formatPhoneNumber = (phoneNumberString) => {
    let cleaned = ('' + phoneNumberString).replace(/\D/g, '');
    let match = cleaned.match(/^(7|)?(\d{3})(\d{3})(\d{4})$/);  // +7
    if (match) {
        let intlCode = (match[1] ? '+7 ' : ''); // +7
        return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
    }
    return null;
}


//--DEBUG: исходный вариант
//  https://stackoverflow.com/questions/8358084/regular-expression-to-reformat-a-us-phone-number-in-javascript
/*
function formatPhoneNumber(phoneNumberString) {
    var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
    //var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);    // +1
    var match = cleaned.match(/^(7|)?(\d{3})(\d{3})(\d{4})$/);      // +7
    if (match) {
        //var intlCode = (match[1] ? '+1 ' : '');   // +1
        var intlCode = (match[1] ? '+7 ' : '');     // +7
        return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
    }
    return null;
}

//--tests
//console.log(formatPhoneNumber('+79130112233'));   //= +7 (913) 011-2233
//console.log(formatPhoneNumber('9130112233'));     //= (913) 011-2233
*/
