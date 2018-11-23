import { getRandomNumber } from '../utils';

const commentTemplate = comment => `<li class="social__comment">
<img class="social__picture" src="img/avatar-
  ${getRandomNumber(1, 6)}.svg"
  alt="Аватар комментатора фотографии"
  width="35" height="35">
  <p class="social__text">${comment}</p>
</li>`;

export default commentTemplate;
