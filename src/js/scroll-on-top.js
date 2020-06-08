const showBtn = document.getElementById('hidden');

const scrollOnTop = () => {
  if (showBtn.classList.contains('hidden') && window.pageYOffset > 100) showBtn.classList.remove('hidden');
  else if (window.pageYOffset < 100) showBtn.classList.add('hidden');
  else if (!window.pageYOffset) showBtn.classList.add('hidden');
};

export default scrollOnTop;
