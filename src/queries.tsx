export const getDefaultAlbums = ` {
    albums(ids: "0xJyM0DFwty067hIBH5fql,33pt9HBdGlAbRGBHQgsZsU,21jF5jlMtzo94wbxmJ18aa,6i6folBtxKV28WX3msQ4FE,0Y7qkJVZ06tS2GUCDptzyW,06mXfvDsRZNfnsGZvX2zpb") {
    id
    name
    images{
       url
    }
    artists {
       name
    }
    tracks{
      id
      name
      uri
      artists{
         name
      }
    }
    }
  } `;

export const searchAlbums = (searchValue: string) =>
  ` {
          albums(name: "${searchValue}"){
            id
            name
            images{
              url
            }
            artists {
              name
            }
            tracks{
              id
              name
              uri
              artists{
                name
              }
            }
          }
        } `;
