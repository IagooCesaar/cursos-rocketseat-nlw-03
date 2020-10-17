import React, { useState, FormEvent, ChangeEvent } from "react";
import { Map, Marker, TileLayer } from "react-leaflet";
import { LeafletMouseEvent } from "leaflet";
import { FiPlus, FiXSquare } from "react-icons/fi";
import { useHistory } from "react-router-dom";

import SideBar from "../components/SideBar";
import mapIcon from "../utils/mapIcon";

import api from "../services/api";

import "../styles/pages/create-orphanage.css";

interface Orphanage {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
}

export default function CreateOrphanage() {
  const history = useHistory();
  const [position, setPosition] = useState({
    latitude: 0,
    longitude: 0,
  });
  function handleMapClick(event: LeafletMouseEvent) {
    const { lat, lng } = event.latlng;
    setPosition({
      latitude: lat,
      longitude: lng,
    });
  }
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [instructions, setInstructions] = useState("");
  const [opening_hours, setOpeningHours] = useState("");
  const [open_on_weekends, setOpenOnWeekends] = useState(true);
  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  function handleSelectImages(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) {
      return;
    }
    const selectedImages = event.target.files;
    setImages([...images, ...Array.from(selectedImages)]);
    const selectedImagesPreview = Array.from(selectedImages).map((image) => {
      return URL.createObjectURL(image);
    });
    setPreviewImages([...previewImages, ...selectedImagesPreview]);
  }

  function handleRemoveImage(index: number) {
    let selectedImages = images;
    selectedImages.splice(index, 1);
    setImages([...selectedImages]);

    let selectedImagesPreview = previewImages;
    selectedImagesPreview.splice(index, 1);
    setPreviewImages([...selectedImagesPreview]);
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const { latitude, longitude } = position;

    const data = new FormData();
    data.append("name", name);
    data.append("latitude", String(latitude));
    data.append("longitude", String(longitude));
    data.append("about", about);
    data.append("instructions", instructions);
    data.append("opening_hours", opening_hours);
    data.append("open_on_weekends", String(open_on_weekends));
    images.forEach((image) => data.append("images", image));

    async function ApplyData() {
      try {
        const result = await api.post("/orphanages", data);
        console.log(result.data);
        alert("Cadastro realizado com sucesso");
        history.push("/app");
      } catch {
        alert("Falha ao realizar o cadastro");
      }
    }
    ApplyData();
  }

  return (
    <div id="page-create-orphanage">
      <SideBar />
      <main>
        <form className="create-orphanage-form" onSubmit={handleSubmit}>
          <fieldset>
            <legend>Dados</legend>

            <Map
              center={[-21.8935062, -45.5912661]}
              style={{ width: "100%", height: 280 }}
              zoom={15}
              onclick={handleMapClick}
            >
              <TileLayer
                url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
              />

              {position.latitude !== 0 && (
                <Marker
                  interactive={false}
                  icon={mapIcon}
                  position={[position.latitude, position.longitude]}
                />
              )}
            </Map>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input
                id="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="about">
                Sobre <span>Máximo de 300 caracteres</span>
              </label>
              <textarea
                id="name"
                maxLength={300}
                value={about}
                onChange={(e) => setAbout(e.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>
              <div className="images-container">
                {previewImages.map((image, index) => {
                  return (
                    <div key={image} className="image-container">
                      <img
                        src={image}
                        alt={`${index + 1} imagem selecionada`}
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                      >
                        <FiXSquare size={18} color="#fff" />
                      </button>
                    </div>
                  );
                })}
                <label className="new-image" htmlFor="image[]">
                  <FiPlus size={24} color="#15b6d6" />
                </label>
              </div>
              <input
                multiple
                type="file"
                id="image[]"
                onChange={handleSelectImages}
              />
            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea
                id="instructions"
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário de funcionamento</label>
              <input
                id="opening_hours"
                value={opening_hours}
                onChange={(e) => setOpeningHours(e.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button
                  type="button"
                  className={open_on_weekends ? "active" : ""}
                  onClick={() => setOpenOnWeekends(true)}
                >
                  Sim
                </button>
                <button
                  type="button"
                  className={!open_on_weekends ? "active" : ""}
                  onClick={() => setOpenOnWeekends(false)}
                >
                  Não
                </button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
