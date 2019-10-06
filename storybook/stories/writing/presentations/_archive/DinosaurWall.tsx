import React, { useMemo, useState, useEffect } from "react";
import { createDinoService, Dinosaur } from "./DinoAdoptService";
import { DinosaurThumbnail } from "./DinosaurThumbnail";

export function DinosaurWall() {
  const [currentPage, setCurrentPage] = useState(0);
  const [dinos, setDinos] = useState([] as Dinosaur[]);

  const service = useMemo(() => createDinoService(), []);

  function loadMoreDinos() {
    service.fetchDinoRange(currentPage * 4, 4).then(moreDinos => {
      setDinos(dinos.concat(moreDinos));
      setCurrentPage(currentPage + 1);
    });
  }

  // initial load
  useEffect(() => {
    loadMoreDinos();
  }, []);

  return (
    <>
      <h1>Dinosaurs</h1>
      {dinos.map(dino => (
        <DinosaurThumbnail key={dino.id} dino={dino} />
      ))}
      <div className="btn btn-default" onClick={loadMoreDinos}>
        Load More
      </div>
    </>
  );
}
