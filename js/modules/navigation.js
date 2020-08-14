import * as unsplash from '../api/unsplash.js';

export async function updateBackground(event) {
  let img = await unsplash.getImage();
  document.getElementById("background").style.backgroundImage = "linear-gradient(rgba(8, 15, 26, 0.59) 0%, rgba(17, 17, 46, 0.46) 100%), url('" + img.urls.full + "')";
}
