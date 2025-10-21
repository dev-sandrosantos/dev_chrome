// Lógica do gerador de senhas usando crypto.getRandomValues
(function(){
  const el = id => document.getElementById(id);
  const lengthEl = el('length');
  const lengthValue = el('lengthValue');
  const lowerEl = el('lower');
  const upperEl = el('upper');
  const digitsEl = el('digits');
  const specialsEl = el('specials');
  const specialCharsEl = el('specialChars');
  const excludeAmbiguousEl = el('excludeAmbiguous');
  const generateBtn = el('generate');
  const copyBtn = el('copy');
  const passwordEl = el('password');
  const strengthEl = el('strength');
  const messageEl = el('message');
  const themeToggle = el('themeToggle');
  const fontButtons = Array.from(document.querySelectorAll('.font-btn'));

  function applyFont(size){
  // aplicar no root (html) para que todo o popup acompanhe a mudança
  document.documentElement.classList.remove('font-small','font-normal','font-large');
  document.documentElement.classList.add(size === 'small' ? 'font-small' : size === 'large' ? 'font-large' : 'font-normal');
    fontButtons.forEach(b=> b.setAttribute('aria-checked', b.dataset.size === size ? 'true' : 'false'));
    // atualizar aria-labels para refletir o estado
    fontButtons.forEach(b=>{
      const labelBase = b.dataset.size === 'small' ? 'Fonte pequena' : b.dataset.size === 'large' ? 'Fonte grande' : 'Fonte normal';
      b.setAttribute('aria-label', b.dataset.size === size ? labelBase + ' (selecionada)' : labelBase);
    });
    localStorage.setItem('fontSize', size);
    // focus no botão selecionado para feedback de teclado
    const btn = fontButtons.find(b=> b.dataset.size === size);
    if (btn) btn.focus();
  }
  const savedFont = localStorage.getItem('fontSize') || 'normal';
  applyFont(savedFont);
  fontButtons.forEach(b=> b.addEventListener('click', ()=> applyFont(b.dataset.size)));
  // suporte a navegação por setas no radiogroup
  const fontGroup = document.querySelector('.font-controls');
  fontGroup.addEventListener('keydown', (e)=>{
    const sizes = ['small','normal','large'];
    const currentIndex = sizes.indexOf(localStorage.getItem('fontSize') || 'normal');
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      const next = sizes[(currentIndex + 1) % sizes.length];
      applyFont(next);
      e.preventDefault();
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      const prev = sizes[(currentIndex + sizes.length - 1) % sizes.length];
      applyFont(prev);
      e.preventDefault();
    }
  });

  // tema inicial
  function applyTheme(theme){
    if (theme === 'dark') document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
    themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
    localStorage.setItem('theme', theme);
  }
  const savedTheme = localStorage.getItem('theme') || 'light';
  applyTheme(savedTheme);

  themeToggle.addEventListener('click', ()=>{
    const current = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    applyTheme(current === 'dark' ? 'light' : 'dark');
  });

  const AMBIGUOUS = 'Il0O';

  function buildAllowed() {
    let chars = '';
    if (lowerEl.checked) chars += 'abcdefghijklmnopqrstuvwxyz';
    if (upperEl.checked) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (digitsEl.checked) chars += '0123456789';
    if (specialsEl.checked) chars += specialCharsEl.value || '';
    if (excludeAmbiguousEl.checked) {
      chars = chars.split('').filter(c => !AMBIGUOUS.includes(c)).join('');
    }
    return chars;
  }

  function generatePassword(length, allowedChars) {
    if (!allowedChars || allowedChars.length === 0) return '';
    const result = [];
    const rand = new Uint32Array(length);
    crypto.getRandomValues(rand);
    for (let i = 0; i < length; i++) {
      const idx = rand[i] % allowedChars.length;
      result.push(allowedChars.charAt(idx));
    }
    return result.join('');
  }

  function calcStrength(pwd){
    if (!pwd) return '';
    let score = pwd.length >= 12 ? 2 : pwd.length >= 10 ? 1 : 0;
    const categories = [/[a-z]/, /[A-Z]/, /\d/, /[^A-Za-z0-9]/].reduce((s, r) => s + (r.test(pwd) ? 1 : 0), 0);
    score += categories >= 3 ? 1 : 0;
    return score >= 2 ? 'Alta' : score === 1 ? 'Média' : 'Fraca';
  }

  function validate(){
    const len = Number(lengthEl.value);
    const allowed = buildAllowed();
    if (len < 8 || len > 16) {
      messageEl.textContent = 'Comprimento deve ser entre 8 e 16.';
      generateBtn.disabled = true;
      return false;
    }
    if (!allowed || allowed.length === 0){
      messageEl.textContent = 'Selecione ao menos uma categoria de caracteres.';
      generateBtn.disabled = true;
      return false;
    }
    messageEl.textContent = '';
    generateBtn.disabled = false;
    return true;
  }

  lengthEl.addEventListener('input', ()=>{
    lengthValue.textContent = lengthEl.value;
    validate();
  });

  // garantir foco inicial para teclado
  generateBtn.addEventListener('keydown', (e)=>{
    if (e.key === 'Enter') generateBtn.click();
  });

  [lowerEl,upperEl,digitsEl,specialsEl,excludeAmbiguousEl,specialCharsEl].forEach(i=> i.addEventListener('change', validate));

  generateBtn.addEventListener('click', ()=>{
    if (!validate()) return;
    const len = Number(lengthEl.value);
    const allowed = buildAllowed();
    let pwd = '';
    // regra especial: quando comprimento for 8, forçar ao menos 1 maiúscula e 1 especial (se selecionadas)
    if (len === 8) {
      const needUpper = upperEl.checked;
      const needSpecial = specialsEl.checked && (specialCharsEl.value || '').length > 0;
      if (needUpper || needSpecial) {
        // construir arrays de caracteres por categoria
        const uppers = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
        const specialsChars = (specialCharsEl.value || '').split('');
        // prepare result array
        const res = new Array(len);
        const usedPositions = new Set();

        // helper para sortear posição livre
        function randPos() {
          const buf = new Uint32Array(1);
          crypto.getRandomValues(buf);
          let p = buf[0] % len;
          // buscar posição livre
          for (let i = 0; i < len; i++) {
            const idx = (p + i) % len;
            if (!usedPositions.has(idx)) return idx;
          }
          // fallback
          for (let i = 0; i < len; i++) if (!usedPositions.has(i)) return i;
          return 0;
        }

        if (needUpper) {
          const p = randPos(); usedPositions.add(p);
          const buf = new Uint32Array(1); crypto.getRandomValues(buf);
          res[p] = uppers[buf[0] % uppers.length];
        }
        if (needSpecial) {
          const p = randPos(); usedPositions.add(p);
          const buf = new Uint32Array(1); crypto.getRandomValues(buf);
          res[p] = specialsChars[buf[0] % specialsChars.length];
        }

        // preencher posições restantes com caracteres aleatórios do conjunto permitido
        const remainingPositions = [];
        for (let i = 0; i < len; i++) if (!usedPositions.has(i)) remainingPositions.push(i);
        if (remainingPositions.length > 0) {
          const rand = new Uint32Array(remainingPositions.length);
          crypto.getRandomValues(rand);
          for (let i = 0; i < remainingPositions.length; i++) {
            const pos = remainingPositions[i];
            const ch = allowed.charAt(rand[i] % allowed.length);
            res[pos] = ch;
          }
        }
        pwd = res.join('');
      } else {
        pwd = generatePassword(len, allowed);
      }
    } else {
      pwd = generatePassword(len, allowed);
    }
    passwordEl.textContent = pwd;
    strengthEl.textContent = 'Força: ' + calcStrength(pwd);
  });

  copyBtn.addEventListener('click', ()=>{
    const pwd = passwordEl.textContent;
    if (!pwd) {
      messageEl.textContent = 'Nada para copiar.';
      return;
    }
    navigator.clipboard.writeText(pwd).then(()=>{
      messageEl.textContent = 'Senha copiada para a área de transferência.';
      setTimeout(()=> messageEl.textContent = '', 2500);
    }).catch(err=>{
      messageEl.textContent = 'Falha ao copiar: ' + (err && err.message || err);
    });
  });

  // inicialização
  lengthValue.textContent = lengthEl.value;
  validate();
})();
