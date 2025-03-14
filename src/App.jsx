import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import './App.css'

import ProductViewer from './components/ProductModel'

import { IoChevronBack } from "react-icons/io5";

// data
import colorsData from './data/colors'

// images
import myPatchIcon from './assets/images/patches/types/My-Patches.svg'
import aiPatchIcon from './assets/images/patches/types/AI-1.svg'
import patchIcon from './assets/images/patches/types/Patch.svg'
import letterIcon from './assets/images/patches/types/Letters.svg'
import uploadIcon from './assets/images/patches/types/Upload.svg'
import byronCollar from './assets/images/byron-collar.svg'
import hoodieCollar from './assets/images/hoodie-collar.svg'
import regularCollar from './assets/images/regular-collar.svg'
// import retroSailorCollar from './assets/images/retroSailor-collar.svg'
import sailorCollar from './assets/images/sailor-collar.svg'

// 3d model
import model from './assets/models/model.glb'

import patchBullDog from './assets/images/patches/bull-dog.png'
import patchMasks from './assets/images/patches/masks.png'
import patchSkull from './assets/images/patches/skull.png'
import patchUsFlag from './assets/images/patches/us-flag.png'

// textures
import patchPositions from './data/patchPosition'


const App = () => {
  const [formData, setFormData] = useState({
    collar: 'byron',
    body: colorsData[0],
    sleeves: colorsData[0],
    insideLining: colorsData[23],
    pocket: colorsData[23],
    shoulderInserts: colorsData[2],
    snaps: colorsData[2],
  })
  const [activeOption, setActiveOption] = useState(null)
  // const [texture, setTexture] = useState(textureTransparent)
  const [patch, setPatch] = useState(null)

  const [patchArray, setPatchArray] = useState([])

  const addToPatchArray = (newPatch) => {
    setPatchArray((prevArray) => {
      let temp = [...prevArray];
      const index = temp.findIndex((item) => item.position === newPatch.position);

      if (index !== -1) {
        temp[index] = newPatch;
      } else {
        temp.push(newPatch);
      }

      return temp;
    });
  };



  const handleValue = (e) => {
    const { name, value } = e.target
    try {
      setFormData({ ...formData, [name]: JSON.parse(value) })
    } catch (error) {
      setFormData({ ...formData, [name]: value })
    }
  }


  const handlePatch = (e) => {
    setPatch({ ...patch, texture: e.target.value })
  }

  useEffect(() => {
    if (patch?.position && patch?.texture) {
      addToPatchArray(patch)
    }
  }, [patch])


  const handlePathUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      // setPatchArray((prevArray) => [...prevArray, { ...patch, texture: imageURL, type: 'image' }]);
      setPatchArray((prevArray) => {
        // Create a copy of the previous state
        let temp = [...prevArray];
        // Check if an item with the same position already exists
        const index = temp.findIndex((item) => item.position === patch?.position);

        if (index !== -1) {
          // Replace the existing item
          temp[index] = { ...patch, texture: imageURL, type: 'image' };
        } else {
          // Add a new item
          temp.push({ ...patch, texture: imageURL, type: 'image' });
        }

        return temp;
      });

      event.target.value = null
      // setPatch(null);
    }
  };
  const handleTextInput = (e) => {
    const value = e.target.value
    if (value.length > 3) {
      e.preventDefault()
    } else {
      setPatch({ ...patch, text: e.target.value })
    }
  }
  return (
    <>
      <main>
        <div className="jacket-builder">
          <div className="container-fluid">
            <div className="row g-4">
              <div className="col-lg-4 col-12 panel">
                <div className="builder-options h-100">
                  <ul className="options-tabs" id="pills-tab" role="tablist">
                    <li className="nav-item" role="presentation">
                      <button className="nav-link active" onClick={() => setActiveOption(null)} id="pills-material-tab" data-bs-toggle="pill"
                        data-bs-target="#pills-material" type="button" role="tab"
                        aria-controls="pills-material" aria-selected="true">Materials & Colors</button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button className="nav-link" onClick={() => setActiveOption(null)} id="design-tab" data-bs-toggle="pill" data-bs-target="#design"
                        type="button" role="tab" aria-controls="design" aria-selected="false">Design &
                        Patches</button>
                    </li>
                  </ul>
                  <div className="options-content">
                    <div className="tab-content" id="pills-tabContent">
                      <div className="tab-pane fade show active" id="pills-material" role="tabpanel"
                        aria-labelledby="pills-material-tab" tabIndex="0">
                        {!activeOption && <ul className="option-keys">
                          <li>
                            <button data-target="#collar-content" onClick={() => setActiveOption('collar')}>
                              <span className="thumb">
                                <img className="img-fluid" src={byronCollar} alt="" />
                              </span>
                              <div>
                                <h6 className="option">Collar</h6>
                                <h4 className="value">{formData.collar}</h4>
                              </div>
                            </button>
                          </li>
                          <li>
                            <button data-target="#body-color-content" onClick={() => setActiveOption('body')}>
                              <span className="thumb-color">
                                <span className="color"
                                  style={{ backgroundColor: formData.body?.hex }}></span>
                              </span>
                              <div>
                                <h6 className="option">Body</h6>
                                <h4 className="value">{formData.body?.name}</h4>
                              </div>
                            </button>
                          </li>
                          <li>
                            <button data-target="#body-color-content" onClick={() => setActiveOption('sleeves')}>
                              <span className="thumb-color">
                                <span className="color"
                                  style={{ backgroundColor: formData.sleeves?.hex }}></span>
                              </span>
                              <div>
                                <h6 className="option">Sleeves</h6>
                                <h4 className="value">{formData.sleeves?.name}</h4>
                              </div>
                            </button>
                          </li>
                          <li>
                            <button onClick={() => setActiveOption('insideLining')}>
                              <span className="thumb-color">
                                <span className="color" style={{ backgroundColor: formData.insideLining?.hex }}></span>
                              </span>
                              <div>
                                <h6 className="option">Inside Lining</h6>
                                <h4 className="value">{formData.insideLining?.name}</h4>
                              </div>
                            </button>
                          </li>
                          <li>
                            <button onClick={() => setActiveOption('pocket')}>
                              <span className="thumb-color">
                                <span className="color" style={{ backgroundColor: formData.pocket?.hex }}></span>
                              </span>
                              <div>
                                <h6 className="option">Pocket</h6>
                                <h4 className="value">{formData.pocket?.name}</h4>
                              </div>
                            </button>
                          </li>
                          <li>
                            <button onClick={() => setActiveOption('shoulderInserts')}>
                              <span className="thumb-color">
                                <span className="color" style={{ backgroundColor: formData.shoulderInserts?.hex }}></span>
                              </span>
                              <div>
                                <h6 className="option">Shoulder Inserts</h6>
                                <h4 className="value">{formData.shoulderInserts?.name}</h4>
                              </div>
                            </button>
                          </li>
                          <li>
                            <button onClick={() => setActiveOption('snaps')}>
                              <span className="thumb-color">
                                <span className="color" style={{ backgroundColor: formData.shoulderInserts?.hex }}></span>
                              </span>
                              <div>
                                <h6 className="option">Snaps</h6>
                                <h4 className="value">{formData.snaps?.name}</h4>
                              </div>
                            </button>
                          </li>
                        </ul>}
                        {activeOption === 'collar' && <div className="option-values" id="collar-content">
                          <button className="backbtn" onClick={() => setActiveOption(null)}><IoChevronBack /></button>
                          <h6>Choose Collar</h6>
                          <h6 className="current-val">{formData.collar}</h6>
                          <ul className="option-images">
                            <li>
                              <input type="radio" name="collar" value='regular' onChange={handleValue} id="collar-regular" />
                              <label htmlFor="collar-regular">
                                <img src={regularCollar} alt="" />
                                <span className="txt">Regular</span>
                              </label>
                            </li>
                            <li>
                              <input type="radio" name="collar" onChange={handleValue} id="collar-byron" value='byron' />
                              <label htmlFor="collar-byron">
                                <img src={byronCollar} alt="" />
                                <span className="txt">Byron</span>
                              </label>
                            </li>
                            <li>
                              <input type="radio" name="collar" onChange={handleValue} id="collar-hoodie" value='hoodie' />
                              <label htmlFor="collar-hoodie">
                                <img src={hoodieCollar} alt="" />
                                <span className="txt">Hoodie</span>
                              </label>
                            </li>
                            <li>
                              <input type="radio" name="collar" onChange={handleValue} id="collar-sailor" value='sailor' />
                              <label htmlFor="collar-sailor">
                                <img src={sailorCollar} alt="" />
                                <span className="txt">Sailor</span>
                              </label>
                            </li>
                          </ul>
                        </div>}
                        {activeOption === 'body' && <div className="option-values" id="body-color-content">
                          <button className="backbtn" onClick={() => setActiveOption(null)}><IoChevronBack /></button>
                          <h6>Choose Body</h6>
                          <h6 className='current-val'>{formData.body?.name}</h6>
                          <ul className="option-colors">
                            {colorsData.map((item, ind) => (
                              <li key={ind}>
                                <input
                                  value={JSON.stringify(item)}
                                  type="radio"
                                  name="body"
                                  checked={JSON.stringify(formData.body) === JSON.stringify(item)}
                                  onChange={handleValue}
                                  id={`body-color-${item.name.replaceAll(' ', '')}`}
                                />
                                <label htmlFor={`body-color-${item.name.replaceAll(' ', '')}`}>
                                  <span className="color" style={{ background: item.hex }}></span>
                                </label>
                              </li>
                            ))}
                          </ul>
                        </div>}
                        {activeOption === 'sleeves' && <div className="option-values" id="sleeves-color-content">
                          <button className="backbtn" onClick={() => setActiveOption(null)}><IoChevronBack /></button>
                          <h6>Choose Sleeves</h6>
                          <h6 className='current-val'>{formData.sleeves?.name}</h6>
                          <ul className="option-colors">
                            {colorsData.map((item, ind) => (
                              <li key={ind}>
                                <input
                                  value={JSON.stringify(item)}
                                  type="radio"
                                  name="sleeves"
                                  checked={JSON.stringify(formData.sleeves) === JSON.stringify(item)}
                                  onChange={handleValue}
                                  id={`body-sleeves-${item.name.replaceAll(' ', '')}`}
                                />
                                <label htmlFor={`body-sleeves-${item.name.replaceAll(' ', '')}`}>
                                  <span className="color" style={{ background: item.hex }}></span>
                                </label>
                              </li>
                            ))}
                          </ul>
                        </div>}
                        {activeOption === 'insideLining' && <div className="option-values" id="inside-lining-content">
                          <button className="backbtn" onClick={() => setActiveOption(null)}><IoChevronBack /></button>
                          <h6>Choose Inside Lining</h6>
                          <h6 className='current-val'>{formData.insideLining?.name}</h6>
                          <ul className="option-colors">
                            {colorsData.map((item, ind) => (
                              <li key={ind}>
                                <input
                                  value={JSON.stringify(item)}
                                  type="radio"
                                  name="insideLining"
                                  checked={JSON.stringify(formData.insideLining) === JSON.stringify(item)}
                                  onChange={handleValue}
                                  id={`body-insideLining-${item.name.replaceAll(' ', '')}`}
                                />
                                <label htmlFor={`body-insideLining-${item.name.replaceAll(' ', '')}`}>
                                  <span className="color" style={{ background: item.hex }}></span>
                                </label>
                              </li>
                            ))}
                          </ul>
                        </div>}
                        {activeOption === 'pocket' && <div className="option-values" id="pocket-content">
                          <button className="backbtn" onClick={() => setActiveOption(null)}><IoChevronBack /></button>
                          <h6>Choose Pocket</h6>
                          <h6 className='current-val'>{formData.pocket?.name}</h6>
                          <ul className="option-colors">
                            {colorsData.map((item, ind) => (
                              <li key={ind}>
                                <input
                                  value={JSON.stringify(item)}
                                  type="radio"
                                  name="pocket"
                                  checked={JSON.stringify(formData.pocket) === JSON.stringify(item)}
                                  onChange={handleValue}
                                  id={`body-pocket-${item.name.replaceAll(' ', '')}`}
                                />
                                <label htmlFor={`body-pocket-${item.name.replaceAll(' ', '')}`}>
                                  <span className="color" style={{ background: item.hex }}></span>
                                </label>
                              </li>
                            ))}
                          </ul>
                        </div>}
                        {activeOption === 'shoulderInserts' && <div className="option-values" id="shoulderInserts-content">
                          <button className="backbtn" onClick={() => setActiveOption(null)}><IoChevronBack /></button>
                          <h6>Choose Shoulder Inserts</h6>
                          <h6 className='current-val'>{formData.shoulderInserts?.name}</h6>
                          <ul className="option-colors">
                            {colorsData.map((item, ind) => (
                              <li key={ind}>
                                <input
                                  value={JSON.stringify(item)}
                                  type="radio"
                                  name="shoulderInserts"
                                  checked={JSON.stringify(formData.shoulderInserts) === JSON.stringify(item)}
                                  onChange={handleValue}
                                  id={`body-shoulderInserts-${item.name.replaceAll(' ', '')}`}
                                />
                                <label htmlFor={`body-shoulderInserts-${item.name.replaceAll(' ', '')}`}>
                                  <span className="color" style={{ background: item.hex }}></span>
                                </label>
                              </li>
                            ))}
                          </ul>
                        </div>}
                        {activeOption === 'snaps' && <div className="option-values" id="snaps-content">
                          <button className="backbtn" onClick={() => setActiveOption(null)}><IoChevronBack /></button>
                          <h6>Choose Snaps & Zipper</h6>
                          <h6 className='current-val'>{formData.snaps?.name}</h6>
                          <ul className="option-colors">
                            {colorsData.map((item, ind) => (
                              <li key={ind}>
                                <input
                                  value={JSON.stringify(item)}
                                  type="radio"
                                  name="snaps"
                                  checked={JSON.stringify(formData.snaps) === JSON.stringify(item)}
                                  onChange={handleValue}
                                  id={`body-snaps-${item.name.replaceAll(' ', '')}`}
                                />
                                <label htmlFor={`body-snaps-${item.name.replaceAll(' ', '')}`}>
                                  <span className="color" style={{ background: item.hex }}></span>
                                </label>
                              </li>
                            ))}
                          </ul>
                        </div>}
                      </div>
                      <div className="tab-pane patch-tab fade" id="design" role="tabpanel" aria-labelledby="design-tab"
                        tabIndex="0">
                        <div className="option-values" id="collar-content">
                          {!patch?.position && <ul className="option-images">
                            {patchPositions.map((item, ind) => <li key={ind}>
                              <input type="radio" name="collar" onChange={() => setPatch({ ...patch, position: item.value })}
                                id={`patch-position-${ind}`} />
                              <label htmlFor={`patch-position-${ind}`}>
                                <img src={item.icon} alt={item.title} />
                                <span className="txt">{item.title}</span>
                              </label>
                            </li>)}
                          </ul>}
                          {(patch?.position && !patch.type) && <div>
                            <button className="backbtn" onClick={() => setPatch(null)}><IoChevronBack /></button>
                            <h6>{patch.position.split('-').join(' ')}</h6>
                            <h6 className="current-val">byron</h6>
                            <ul className="option-images">
                              <li>
                                <input type="radio" name="patch-type" id="my-patch-image" />
                                <label htmlFor="my-patch-image">
                                  <img src={myPatchIcon} alt="" />
                                </label>
                                <span className="txt">My Patches</span>
                              </li>
                              <li>
                                <input type="radio" name="patch-type" onChange={() => setPatch({ ...patch, type: 'upload' })} id="patch-upload" />
                                <label htmlFor="patch-upload">
                                  <img src={uploadIcon} alt="" />
                                </label>
                                <span className="txt">Upload</span>
                              </li>
                              <li>
                                <input type="radio" name="patch-type" id="ai-patch" />
                                <label htmlFor="ai-patch">
                                  <img src={aiPatchIcon} alt="" />
                                </label>
                                <span className="txt">AI Assisted</span>
                              </li>
                              <li>
                                <input type="radio" name="patch-type" onChange={() => setPatch({ ...patch, type: 'text' })} id="patch-text" />
                                <label htmlFor="patch-text">
                                  <img src={letterIcon} alt="" />
                                </label>
                                <span className="txt">Letters</span>
                              </li>
                              <li>
                                <input type="radio" name="patch-type" onChange={() => setPatch({ ...patch, type: 'image' })} id="patch-image" />
                                <label htmlFor="patch-image">
                                  <img src={patchIcon} alt="" />
                                </label>
                                <span className="txt">Patches</span>
                              </li>
                            </ul>
                          </div>}
                          {patch?.type === 'image' ? <div className="option-values">
                            <button className="backbtn" onClick={() => setPatch(null)}><IoChevronBack /></button>
                            <ul className="option-images">
                              <li>
                                <input type="radio" name="patch" value={patchBullDog} onChange={handlePatch} id="patch-bull-dog" />
                                <label htmlFor="patch-bull-dog">
                                  <img src={patchBullDog} alt="" />
                                </label>
                              </li>
                              <li>
                                <input type="radio" name="patch" value={patchMasks} onChange={handlePatch} id="patch-masks" />
                                <label htmlFor="patch-masks">
                                  <img src={patchMasks} alt="" />
                                </label>
                              </li>
                              <li>
                                <input type="radio" name="patch" value={patchSkull} onChange={handlePatch} id="patch-skull" />
                                <label htmlFor="patch-skull">
                                  <img src={patchSkull} alt="" />
                                </label>
                              </li>
                              <li>
                                <input type="radio" name="patch" value={patchUsFlag} onChange={handlePatch} id="patch-flag" />
                                <label htmlFor="patch-flag">
                                  <img src={patchUsFlag} alt="" />
                                </label>
                              </li>
                            </ul>
                          </div> : patch?.type === 'text' ? <>
                            <button className="backbtn" onClick={() => setPatch(null)}><IoChevronBack /></button>
                            <div className='input-patch'>
                              <input type="text" placeholder='upto 3 character' onChange={handleTextInput} maxLength={3} />
                              <button onClick={() => addToPatchArray(patch)}>Add</button>
                            </div>
                          </> : patch?.type === 'upload' && <div className='upload-patch'>
                            <button className="backbtn" onClick={() => setPatch(null)}><IoChevronBack /></button>
                            <div className="upload-field">
                              <input type="file" onChange={handlePathUpload} />
                              <h5>Drop Your Image, or browse</h5>
                              <h6>Supports: JPG, PNG</h6>
                            </div>
                          </div>}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-8 col-12 panel">
                <div className="model-wrapper h-100">
                  <ProductViewer
                    key={formData}
                    // texturePath={texture} 
                    formData={formData}
                    modelPath={model} patchs={patchArray} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default App
