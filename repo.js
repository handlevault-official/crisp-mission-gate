// --- repo.js: Central Logic Handler ---

let currentTheme = 'dark';
function toggleTheme() {
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.body.setAttribute('data-theme', currentTheme);
}

let step = 1;
let userData = { name: '', scope: '', code: '' };

function openGate() {
    document.getElementById('stepEnvelope').classList.add('hidden');
    document.getElementById('stepGate').classList.remove('hidden');
    renderQuestion();
}

function renderQuestion() {
    document.getElementById('errorMsg').innerText = '';
    document.getElementById('btnBack').classList.toggle('hidden', step === 1);
    document.getElementById('stepIndicator').innerText = `Stage ${step} of 3 • Verification`;

    let title = '', desc = '', html = '';

    if (step === 1) {
        title = "Client / Project Name";
        desc = "Ilagay ang pangalan ng kliyente o proyekto.";
        html = `<input type="text" id="ansVal" placeholder="Crisp Enterprise" value="${userData.name}">`;
    } else if (step === 2) {
        title = "Access Authorization Level";
        desc = "Piliin ang antas ng clearance o lisensya.";
        html = `<select id="ansVal">
            <option value="">Pili ng Level...</option>
            <option value="Full Agency Bundle">Full Agency Bundle 💎</option>
            <option value="Custom Project Build">Custom Project Build 🚀</option>
            <option value="Standard Template">Standard Template 🛡️</option>
        </select>`;
    } else if (step === 3) {
        title = "Security Passphrase / ID";
        desc = "Maglagay ng opisyal na reference code.";
        html = `<input type="text" id="ansVal" placeholder="CRISP-2026-KEY" value="${userData.code}">`;
        document.getElementById('btnNext').innerText = "Verify & Initialize ➔";
    }

    if (step < 3) document.getElementById('btnNext').innerText = "Susunod ➔";

    document.getElementById('qTitle').innerText = title;
    document.getElementById('qDesc').innerText = desc;
    document.getElementById('inputContainer').innerHTML = html;
}

function nextStep() {
    const valElem = document.getElementById('ansVal');
    const err = document.getElementById('errorMsg');
    const val = valElem ? valElem.value.trim() : '';

    if (!val) {
        err.innerText = "⚠️ Paki-fill up muna ang kinakailangang detalye.";
        return;
    }

    if (step === 1) userData.name = val;
    if (step === 2) userData.scope = val;
    if (step === 3) {
        userData.code = val;
        alert(`🎉 Successfully Verified for ${userData.name}! Scope: ${userData.scope}`);
        location.reload();
        return;
    }

    step++;
    renderQuestion();
}

function prevStep() {
    if (step > 1) {
        step--;
        renderQuestion();
    }
}
