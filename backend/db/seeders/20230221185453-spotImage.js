'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'SpotImages';
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        url: 'https://images.unsplash.com/photo-1624628639856-100bf817fd35?q=80&w=2748&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        preview: true
      },
      // {
      //   spotId: 1,
      //   url: 'https://www.gamespot.com/a/uploads/original/1599/15997278/3952949-eldenring.jpeg',
      //   preview: false
      // },
      // {
      //   spotId: 1,
      //   url: 'https://i.ytimg.com/vi/8QLlU2MbrbU/maxresdefault.jpg',
      //   preview: false
      // },
      // {
      //   spotId: 1,
      //   url: 'https://t3.ftcdn.net/jpg/03/53/63/74/360_F_353637419_FO560joWugRH1YzuvbSTXDzFPZd88CdD.jpg',
      //   preview: false
      // },
      // {
      //   spotId: 1,
      //   url: 'https://t4.ftcdn.net/jpg/05/50/05/67/360_F_550056744_BQpiQaYo4Ba6GQ8ILRWLnvPnMFNM5fvt.jpg',
      //   preview: false
      // },
      {
        spotId: 2,
        url: 'https://images.unsplash.com/photo-1642950810976-e0a9926389ab?q=80&w=1666&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        preview: true
      },
      // {
      //   spotId: 2,
      //   url: 'https://qph.cf2.quoracdn.net/main-qimg-373771d66d2ac9af022874b79636065e-pjlq',
      //   preview: false
      // },
      // {
      //   spotId: 2,
      //   url: 'https://0.soompi.io/wp-content/uploads/2021/05/08200436/giselle.jpeg',
      //   preview: false
      // },
      // {
      //   spotId: 2,
      //   url: 'https://assets.teenvogue.com/photos/60a2db73ba459e11292cd762/16:9/w_2560%2Cc_limit/Screen%2520Shot%25202021-05-17%2520at%25205.08.27%2520PM.png',
      //   preview: false
      // },
      // {
      //   spotId: 2,
      //   url: 'https://www.kpop-today.com/medias/images/2021-01_viki.io/82293.jpeg',
      //   preview: false
      // },
      {
        spotId: 3,
        url: 'https://images.unsplash.com/photo-1648598884813-7dfd1c2886d9?q=80&w=2160&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        preview: true
      },
      // {
      //   spotId: 3,
      //   url: 'https://storage.googleapis.com/dream-machines-output/94f2e894-4a8a-4e2c-8e89-b8e8af0f6d76/0_0.png',
      //   preview: false
      // },
      // {
      //   spotId: 3,
      //   url: 'https://forreadingaddicts.co.uk/wp-content/uploads/2020/12/17.jpg',
      //   preview: false
      // },
      // {
      //   spotId: 3,
      //   url: 'https://cdn.thespaces.com/wp-content/uploads/2019/06/Chongqing-Zhongshuge-Bookstore-Feng-Shao-%E9%87%8D%E5%BA%86%E9%92%9F%E4%B9%A6%E9%98%81_00011-HERO.jpg',
      //   preview: false
      // },
      // {
      //   spotId: 3,
      //   url: 'https://www.business2community.com/wp-content/uploads/2014/03/141795_library-fantasy-art-books-artwork-wallpaper_www.wall321.com_39.jpg',
      //   preview: false
      // },
      {
        spotId: 4,
        url: 'https://images.unsplash.com/photo-1684236836009-5004151224dd?q=80&w=2817&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        preview: true
      },
      // {
      //   spotId: 4,
      //   url: 'http://lh6.googleusercontent.com/-LHkfH-zrnzQ/VBPC1nO4fvI/AAAAAAACbuA/guqnVN79V0Q/s720/bb21.jpg',
      //   preview: false
      // },
      // {
      //   spotId: 4,
      //   url: 'https://cdn.vox-cdn.com/thumbor/6mVS7eBoVvitz-RmHVIw79QGmk8=/0x0:2355x1334/1200x0/filters:focal(0x0:2355x1334):no_upscale()/cdn.vox-cdn.com/uploads/chorus_asset/file/9046863/stanton_street_basketball_courts_sport_urban_design_nike_kaws_brian_donnelly_brooklyn_new_york_usa_dezeen_2364_col_4.jpg',
      //   preview: false
      // },
      // {
      //   spotId: 4,
      //   url: 'https://media.istockphoto.com/id/157331741/photo/flaming-football.jpg?s=612x612&w=0&k=20&c=Bceaj4E0KXUxZW6rK37T3HtfYAsz8zIDh9uyAIh1uwI=',
      //   preview: false
      // },
      // {
      //   spotId: 4,
      //   url: 'https://www.seekpng.com/png/detail/158-1583651_934-bc-the-assyrian-empire-is-founded-greek.png',
      //   preview: false
      // },
      {
        spotId: 5,
        url: 'https://images.unsplash.com/photo-1683573254548-ebb7b94d7def?q=80&w=2706&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        preview: true
      },
      // {
      //   spotId: 5,
      //   url: 'https://media.nbcphiladelphia.com/2022/06/barcade.jpg?quality=85&strip=all&resize=1200%2C675',
      //   preview: false
      // },
      // {
      //   spotId: 5,
      //   url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Daikeien_amusement_arcade_2018-05-10.jpg/1280px-Daikeien_amusement_arcade_2018-05-10.jpg',
      //   preview: false
      // },
      // {
      //   spotId: 5,
      //   url: 'https://www.visitpittsburgh.com/imager/s3_amazonaws_com/visit-pittsburgh/CMS/Photo-Jun-04-12-58-44-AM_49338b2ce992ef730f3e2445db4f50c0.jpg',
      //   preview: false
      // },
      // {
      //   spotId: 5,
      //   url: 'https://images.lifestyleasia.com/wp-content/uploads/sites/7/2021/08/10121021/Interiors-5.jpg',
      //   preview: false
      // },
      {
        spotId: 6,
        url: 'https://images.unsplash.com/photo-1654260146880-d23437468422?q=80&w=2728&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        preview: true
      },
      // {
      //   spotId: 6,
      //   url: 'https://img.freepik.com/free-photo/business-people-board-room-meeting_53876-138090.jpg?w=996&t=st=1681096431~exp=1681097031~hmac=59dd9b2d6747540eeddd0e865f3fb7ae4bce0746e70069efbd01c00d9a54e702',
      //   preview: false
      // },
      // {
      //   spotId: 6,
      //   url: 'https://blog.ititranslates.com/wp-content/uploads/2020/02/Dollarphotoclub_66688809-1-1024x664.jpg',
      //   preview: false
      // },
      // {
      //   spotId: 6,
      //   url: 'https://www.santamonica.com/wp-content/uploads/2022/06/santa-monica-meeting-spaces.jpg',
      //   preview: false
      // },
      // {
      //   spotId: 6,
      //   url: 'https://www.ringcentral.com/gb/en/blog/wp-content/uploads/2021/05/business-people-working-in-the-office-scaled.jpg',
      //   preview: false
      // },
      {
        spotId: 7,
        url: 'https://images.unsplash.com/photo-1625671680827-fdc3014d516d?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        preview: true
      },
      // {
      //   spotId: 7,
      //   url: 'https://www.rappler.com/tachyon/r3-assets/612F469A6EA84F6BAE882D2B94A4B421/img/2AD64678BF894DC6B250BE0523FE354C/20200626---blackpink.jpg',
      //   preview: false
      // },
      // {
      //   spotId: 7,
      //   url: 'https://i.pinimg.com/originals/a1/48/e6/a148e62de4ed958f61cb50ad52c38b3e.jpg',
      //   preview: false
      // },
      // {
      //   spotId: 7,
      //   url: 'https://www.cinecom.net/wp-content/uploads/2020/03/set-Black-Pink-1024x535.png',
      //   preview: false
      // },
      // {
      //   spotId: 7,
      //   url: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgIjZNqrQ7pwFaL4f1pWTNzlelrp1ZaIoM4O5PRg4YNYi-AY07_4w5NHZoOtAE3yDmgkmE8BRJlNntswPYzr4442YtmDAne_M8MPbVHYv1bI4P_KYEeMpQ_8UDLrH-VRDO0q-yZiugR9U2BNi_hvCMOJuOtSA3y2J5nVVTPjN_cBM9exgapxUu6H7wUHg/s1339/000001uyuiuyuyui032.jpg',
      //   preview: false
      // },
      {
        spotId: 8,
        url: 'https://images.unsplash.com/photo-1685317307624-0a77b4d9ac7d?q=80&w=2752&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        preview: true
      },
      // {
      //   spotId: 8,
      //   url: 'https://img1.wsimg.com/isteam/ip/ad61c7f0-456a-4914-9fea-491eb12276fa/9572ECEB-26CC-4D31-9FD2-4AA2CF9C98ED.jpeg/:/cr=t:19.88%25,l:0%25,w:100%25,h:60.24%25/rs=w:600,h:300,cg:true',
      //   preview: false
      // },
      // {
      //   spotId: 8,
      //   url: 'https://i.pinimg.com/originals/61/ba/f5/61baf526b6a0c38c4ec475bb850934f6.jpg',
      //   preview: false
      // },
      // {
      //   spotId: 8,
      //   url: 'https://kp-karaoke.com/wp-content/uploads/bar-2.jpg',
      //   preview: false
      // },
      // {
      //   spotId: 8,
      //   url: 'https://confirmgood.com/wp-content/uploads/2022/04/kstar-karaoke-plaza-singapura-thematic-rooms-5-1024x682.jpg',
      //   preview: false
      // }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      id: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8] }
    }, {});
  }
};
