"use client";
"use strict";


import React from 'react'
import {useEffect} from "react";

const page = () => {
  let res;
  useEffect(() => {
    const getHotelRoom = async () => {
        try {
           res = await fetch('/api/HotelReservation/getRoomHotel', {
            method: 'GET'
          })

          if (!res.ok) {
              return;
          }

          console.log(res);

        } catch (e) {
          console.error("Someting went Wrong");
        }
    getHotelRoom();

    } 
    getHotelRoom();

  }, [])



  return (
    <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam, earum, nobis commodi nihil illo eum accusantium, debitis ratione voluptatem unde quas. Tempora sequi harum est facilis inventore culpa maiores adipisci!
    Cumque, repudiandae dolore tempora, voluptates recusandae necessitatibus dolorem error tempore, soluta numquam laudantium ut. Sapiente debitis consectetur, laboriosam est ad maxime itaque, praesentium iste quidem ab aspernatur error repudiandae dolorem?
    Numquam sed aut est rerum cupiditate illum. Repellendus adipisci quasi iste commodi voluptatibus, minus debitis reiciendis, vitae aspernatur natus non illum nam quod esse, ipsum necessitatibus tempora? Harum, sint quidem!
    Inventore autem quibusdam ex perspiciatis laboriosam consequatur obcaecati praesentium non dolores modi et aliquid id quia ea, mollitia deserunt officiis aspernatur quis ipsa aperiam voluptates, rerum nulla, numquam quasi! Laboriosam?
    Corporis odit eum vitae quam illum, fuga voluptatem, quas dolorum aperiam officia maiores libero molestiae explicabo modi, quia vero debitis iste consequuntur praesentium porro ipsa alias dolorem est aliquid. Illum!
    Placeat quisquam cumque aliquam harum sit sequi ratione quo rerum natus, fugit, recusandae commodi? Repellendus at fugiat voluptatum omnis minus, vero ipsa culpa harum ipsam iusto mollitia, ea voluptatem unde!
    Illo itaque voluptate ex reiciendis at aliquid, cumque commodi quasi, totam nemo ducimus consequatur natus odio inventore animi reprehenderit, rerum voluptatibus dolorum. Blanditiis doloremque quidem amet enim sequi. Dolorum, eius!
    Iusto quam expedita suscipit pariatur deleniti tempora, esse, tenetur, necessitatibus dolor officia fuga ipsum. Maxime harum quam quod eum commodi, iure facilis quaerat repudiandae eaque! Perspiciatis beatae placeat tempore temporibus.
    Perferendis neque modi minus exercitationem autem molestiae amet, iusto magnam reprehenderit, esse, eius recusandae quae cupiditate. Ex illo quis impedit incidunt quaerat asperiores assumenda facilis esse doloremque? Perspiciatis, rem provident!
    Velit, suscipit recusandae error perferendis distinctio molestiae voluptates cupiditate? Quod fugiat minus deserunt. Eius ratione tempore fuga assumenda quam, recusandae rerum quis corporis quae est aspernatur animi consequuntur, cupiditate hic!
    Tenetur, cum perspiciatis consectetur, voluptatum repellat ipsam illum suscipit eligendi nesciunt provident, ut ipsum reprehenderit aliquid commodi dolores deserunt debitis aspernatur ratione architecto nemo itaque minus qui. Architecto, sequi accusantium.
    Sapiente, hic adipisci dignissimos dolorem ut excepturi vel atque id dolor accusamus iusto error natus. Odit, quam nulla! Nostrum possimus quidem provident! Tempora, distinctio ratione! Asperiores laborum facere ducimus nihil!
    Iusto necessitatibus porro perspiciatis veritatis et, harum laboriosam atque pariatur reiciendis voluptate delectus non eaque iste eos facere doloremque laudantium quasi corporis ullam dolores qui nostrum tenetur ab obcaecati. Tempore!
    Alias esse corrupti molestiae quidem, repellat exercitationem natus dolorem saepe eos sunt cum quae sapiente repudiandae magnam impedit atque, velit laboriosam, quaerat omnis fugit aspernatur aut animi! Error, commodi iusto!
    Eaque aperiam numquam qui vitae dolor tempora delectus deleniti eveniet magnam, ipsum esse doloremque rerum soluta obcaecati sunt adipisci, porro at consequuntur sint? Corporis, non fugiat! Minima iure temporibus ut.
    Magni error sint, atque suscipit molestiae dolor repellendus ut consequatur cumque maxime, deserunt mollitia commodi ad officia recusandae. Eaque quaerat porro praesentium provident vero maiores enim at excepturi maxime blanditiis.
    Ab, iste! Mollitia, quidem quos eius, maxime voluptates ex non odio perferendis earum quibusdam atque, ipsum fugiat voluptas quis iste! Sint, necessitatibus sunt. Consectetur nulla ab officiis esse earum dolorum.
    Tenetur voluptates magnam, facilis, a quasi rem distinctio maiores accusamus exercitationem sed veritatis natus vero incidunt porro quidem minus placeat. Illo maxime excepturi ad accusantium exercitationem assumenda minus tenetur architecto!
    Magnam quo eveniet in cupiditate. Provident odio maxime tempora facilis minus ducimus tenetur saepe quia fugiat quaerat dolorum nobis voluptas, necessitatibus ratione aut atque consequatur maiores libero adipisci molestiae ea?
    Sed corporis aut quas atque, ducimus rerum in! Ex perspiciatis necessitatibus, reprehenderit adipisci sequi vel eligendi atque! Facere illum officia eligendi quasi. Repudiandae sed eius placeat deleniti hic, dolorum eaque?
    Animi possimus nihil ullam blanditiis recusandae eum nostrum ea debitis minus magnam, quisquam molestiae aspernatur voluptatibus ipsa fugiat quod hic voluptatem odit placeat nemo fuga! Commodi odit doloribus est hic.
    Sed iusto accusamus voluptatem ea incidunt nulla, sunt molestias reprehenderit deleniti corrupti veritatis inventore alias fugiat architecto ipsa fugit, ullam eveniet nobis laudantium, odio dolores? Deserunt maxime fugit ea aliquid?
    Accusamus quos reprehenderit quidem eos, a officia voluptatum, qui laborum facere dolores esse excepturi enim ipsa! Natus culpa cum nesciunt blanditiis cupiditate, suscipit, provident, alias quidem odio commodi quisquam consequuntur.
    Facere quibusdam maiores cumque dolorum assumenda cupiditate totam fugit tenetur atque animi numquam iure ut quas sint facilis suscipit commodi fuga quaerat unde ducimus sequi, consequuntur voluptate! Nihil, eius iusto!
    Delectus molestias impedit pariatur id nihil? Assumenda, molestias. Sit sequi repellendus suscipit deserunt neque, ad eos iste autem, maxime totam, voluptatem tempora fuga. Excepturi maxime pariatur, aliquam consequatur dolorum officia.
    Ea quos omnis beatae quaerat, animi soluta rem totam aspernatur modi nam accusantium asperiores, reiciendis tempore? Ex, ab nemo voluptas doloribus maxime corrupti laudantium quam, recusandae, reprehenderit excepturi inventore quisquam.
    Ratione laboriosam mollitia animi ut. Illum, voluptatum cumque ullam cupiditate iusto sed in ad dolorum quod officiis error velit quasi deserunt officia saepe perspiciatis. Repellendus necessitatibus nobis sunt perspiciatis ab.
    Nesciunt nam necessitatibus dolore autem, cum corporis animi rem maxime id dicta minima. Atque consectetur similique iste ipsum et perspiciatis ut, quo quae amet consequuntur, quod recusandae ad quia commodi.
    Rem suscipit ad neque sed quo, est dolor dolores! Quam at eius, labore qui dolore veniam alias similique minima nesciunt amet, accusantium porro ipsum unde laborum reprehenderit repellat sunt culpa.
    Perspiciatis unde minus pariatur esse delectus adipisci, nihil amet fugiat dolorem error corrupti qui ab dicta distinctio deserunt doloremque magni nisi reprehenderit ratione eligendi repellendus aut. Consequuntur consequatur consectetur commodi!</div>
  )
}

export default page