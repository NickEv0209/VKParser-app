function getUsers(profiles) {
  return profiles.map(({ id, first_name, last_name, photo_base }) => ({
    id,
    name: `${first_name} ${last_name}`,
    avatar: photo_base,
    link: `https://vk.com/im/convo/${id}`,
  }));
}

function extractLinks(text) {
  return text.match(/https?:\/\/[^\s]+/g) || [];
}

function getLinksFromMessage(mess) {
  const textLink = extractLinks(mess.text)[0];
  const links = mess.attachments
    .map((attach) => (attach.hasOwnProperty("link") ? attach.link.url : null))
    .filter(Boolean);

  if (textLink && !links.includes(textLink)) {
    links.push(textLink);
  }

  return { userID: mess.from_id, links };
}

function processFwdMessages(mess, allLinks) {
  allLinks.push(getLinksFromMessage(mess));

  if (mess.hasOwnProperty("fwd_messages")) {
    mess.fwd_messages.forEach((fwd) => processFwdMessages(fwd, allLinks));
  }
}

function getLinks(items) {
  const allLinks = [];

  for (const item of items) {
    allLinks.push(getLinksFromMessage(item));
    item.fwd_messages.forEach((mess) => processFwdMessages(mess, allLinks));
  }

  const mergedLinks = {};
  allLinks.forEach(({ userID, links }) => {
    if (!mergedLinks[userID]) {
      mergedLinks[userID] = new Set(links);
    } else {
      links.forEach((link) => mergedLinks[userID].add(link));
    }
  });

  return Object.entries(mergedLinks).map(([userID, links]) => ({
    userID,
    links: Array.from(links),
  }));
}

module.exports = { getUsers, getLinks };
