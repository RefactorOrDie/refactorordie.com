import React from "react";
import { Dinosaur } from "./DinoAdoptService";
import { style } from "typestyle";
import { em, percent } from "csx";

export function DinosaurThumbnail({
  dino: { imageUrl, name, id }
}: {
  dino: Dinosaur;
}) {
  return (
    <div
      className={style({
        width: em(6),
        borderRadius: em(1),
        display: 'inline-block',
        overflow: "hidden",
        $nest: {
          ">img": {
            width: em(6)
          }
        }
      })}
    >
      {imageUrl && <img src={imageUrl} alt={name} />}
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        {/* <a className="btn btn-primary">{name}</a> */}
      </div>
    </div>
  );
}
