export async function getTotal(
  uuid?: string,
  folderName: string = 'exhibtions'
) {
  const response = await fetch(
    `https://api.storyblok.com/v2/cdn/stories?token=${
      process.env.STORYBLOK_PREVIEW_TOKEN
    }&starts_with=${folderName}/&version=draft&is_startpage=false${
      uuid ? `&search_term=${uuid}` : ''
    }`
  );
  const total = await response?.headers.get('total');
  return total;
}
