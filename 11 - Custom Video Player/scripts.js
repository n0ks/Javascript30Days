//Get elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggler = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider')

//Build functions
function togglePlay() {
	if (video.paused) {
		video.play();
	} else {
		video.pause();
	}
}

function updateBtn() {

	const icon = this.paused ? '>' : '||';
	console.log(icon);
	toggler.textContent = icon;
}

function skip() {
	video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
	video[this.name] = this.value;
}

function scrub(e) {
	console.log(e);
	const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
	video.currentTime = scrubTime;
}

function handleProgress() {

	const percent = (video.currentTime / video.duration) * 100;
	progressBar.style.flexBasis = `${percent}%`
}
//Listeners
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateBtn);
video.addEventListener('pause', updateBtn);
video.addEventListener('timeupdate', handleProgress);
toggler.addEventListener('click', togglePlay);

skipButtons.forEach(button => button.addEventListener('click', skip));

ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);