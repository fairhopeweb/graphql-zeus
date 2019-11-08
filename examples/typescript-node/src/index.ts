import { Gql, SpecialSkills, Zeus } from "./graphql-zeus";
const run = async () => {
  const { addCard: ZeusCard } = await Gql.Mutation({
    addCard: [
      {
        card: {
          Attack: 1,
          Defense: 2,
          description: "aa",
          name: "SADSD",
          skills: [SpecialSkills.FIRE],
        },
      },
      {
        __typename: true,
        skills: true,
        Children: true,
        cardImage: {
          bucket: true,
        },
      },
    ],
  });

  const blalba = await Gql.Query({
    drawChangeCard: {
      "__typename": true,
      "...on EffectCard": {
        effectSize: true,
        name: true,
      },
      "...on SpecialCard": {
        name: true,
      },
    },
  });
  console.log(blalba.drawChangeCard.__typename);
  console.log("DRAW ...");
  // const { addCard: ZeusCard } = await chain.Mutation({
  //   addCard: [
  //     {
  //       card: {
  //         Attack: 1,
  //         Defense: 2,
  //         description: "aa",
  //         name: "SADSD",
  //         skills: [SpecialSkills.FIRE],
  //       },
  //     },
  //     {
  //  __alias:{
  //    otherAttack:{
  //
  // }
  //  }
  //       name: true,
  //       Attack: true,
  //       Defense: true,
  //       description: true,
  //     },
  //   ],
  // });
  //
  // The way it should be returned
  // ZeusCard.__alias["myAlias"].Attack
  console.log(ZeusCard);
  const { listCards: stack, drawCard: newCard } = await Gql.Query({
    listCards: {
      name: true,
      cardImage: {
        bucket: true,
      },
    },
    drawCard: {
      Attack: true,
    },
  });
  console.log(stack, newCard);

  const aliasedQuery = Zeus.Query({
    __alias: {
      myCards: {
        listCards: {
          name: true,
        },
      },
    },
    listCards: {
      __alias: {
        atak: {
          attack: [
            { cardID: ["1"] },
            {
              name: true,
              description: true,
              __alias: {
                bbb: {
                  Defense: true,
                },
              },
            },
          ],
        },
      },
    },
  });
  console.log(aliasedQuery);
  const aliasedQueryExecute = await Gql.Query({
    listCards: {
      __alias: {
        atak: {
          attack: [
            { cardID: ["1"] },
            {
              name: true,
              description: true,
            },
          ],
        },
      },
    },
  });
  console.log(JSON.stringify(aliasedQueryExecute, null, 4));
  console.log(
    JSON.stringify(aliasedQueryExecute.listCards!.map((card) => card.atak!.attack!), null, 4),
  );
};
run();
