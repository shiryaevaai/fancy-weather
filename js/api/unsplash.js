export async function getImage() {
  let url = 'https://api.unsplash.com/photos/random?orientation=landscape&per_page=1&query=nature&client_id=hxTyERG2iT1UgCuNf1gbewyZ18H_5UMFAMzDoG9lifg';
  let res = await fetch(url);
  let data = await res.json();
  return data;
}
