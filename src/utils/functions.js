const axios = require("axios");
const cheerio = require("cheerio");
const baseURL = "http://elearning2122.hayunmtsn1kotim.my.id/";

function addMetadata(packname, author) {
  if (!packname) packname = "Rizqi";
  if (!author) author = "a.k.a ZefianAlfian";
  author = author.replace(/[^a-zA-Z0-9]/g, "");
  let name = `${author}_${packname}`;
  if (fs.existsSync(path.join(`${__dirname}/../../temp/${name}.exif`)))
    return path.join(`${__dirname}/../../temp/${name}.exif`);
  const json = {
    "sticker-pack-name": packname,
    "sticker-pack-publisher": author,
  };
  const littleEndian = Buffer.from([
    0x49, 0x49, 0x2a, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57,
    0x07, 0x00,
  ]);
  const bytes = [0x00, 0x00, 0x16, 0x00, 0x00, 0x00];
  let len = JSON.stringify(json).length;
  let last;
  if (len > 256) {
    len = len - 256;
    bytes.unshift(0x01);
  } else {
    bytes.unshift(0x00);
  }
  if (len < 16) {
    last = len.toString(16);
    last = "0" + len;
  } else {
    last = len.toString(16);
  }
  const buf2 = Buffer.from(last, "hex");
  const buf3 = Buffer.from(bytes);
  const buf4 = Buffer.from(JSON.stringify(json));
  const buffer = Buffer.concat([littleEndian, buf2, buf3, buf4]);
  fs.writeFile(
    path.join(`${__dirname}/../../temp/${name}.exif`),
    buffer,
    (err) => {
      return path.join(`${__dirname}/../../temp/${name}.exif`);
    }
  );
}

//Function E-Leaning

const getSession = async (username, password, ajaran = "2021") => {
  const data = await axios.post(
    `${baseURL}login/do_login`,
    `username=${username}&password=${password}&ajaran=${ajaran}`
  );

  const obj = {
    cookie: `${data.headers["set-cookie"][0].split(";")[0]}`,
    path: `${baseURL}${data.data}`,
  };
  return obj;
};

const cekNotif = async (session) => {
  const data = await axios({
    method: "POST",
    url: session.path + "/cheknotif",
    headers: {
      cookie: session.cookie,
    },
  });

  return data;
};

const lihatSemuaKelas = async (session) => {
  const data = await axios({
    method: "POST",
    url: session.path + "master/grid_kelas",
    headers: {
      cookie: session.cookie,
    },
  });
  return data;
};

module.exports = {
  addMetadata,
  lihatSemuaKelas,
  cekNotif,
  getSession,
};
