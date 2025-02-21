import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import './App.css'

import ProductViewer from './components/ProductModel'

import { IoChevronBack } from "react-icons/io5";

// design and patches
import aboveLeftElbowPatch from './assets/images/design-patches/Above-left-elbow.svg'
import aboveLeftPocketPatch from './assets/images/design-patches/Above-left-pocket.svg'
import aboveRightElbowPatch from './assets/images/design-patches/Above-right-elbow.svg'
import backPatch from './assets/images/design-patches/Back.svg'
import belowLeftElbowPatch from './assets/images/design-patches/Below-left-elbow.svg'
import belowLeftPocketPatch from './assets/images/design-patches/Below-left-pocket.svg'
import belowRightElbowPatch from './assets/images/design-patches/Below-right-elbow.svg'
import bottomLeftSleevePatch from './assets/images/design-patches/Bottom-of-left-sleeve.svg'
import bottomRightSleevePatch from './assets/images/design-patches/Bottom-of-right-sleeve.svg'
import leftChestPatch from './assets/images/design-patches/Left-Chest.svg'
import leftShoulderPatch from './assets/images/design-patches/Left-shoulder.svg'
import rightChestPatch from './assets/images/design-patches/Right-Chest.svg'
import rightShoulderPatch from './assets/images/design-patches/Right-shoulder.svg'

// images
import patchIcon from './assets/images/patches/patch-icon.jpg'
import letterIcon from './assets/images/patches/letter-icon.png'
import uploadIcon from './assets/images/patches/upload-icon.png'
import byronCollar from './assets/images/byron-collar.svg'
import hoodieCollar from './assets/images/hoodie-collar.svg'
import regularCollar from './assets/images/regular-collar.svg'
// import retroSailorCollar from './assets/images/retroSailor-collar.svg'
import sailorCollar from './assets/images/sailor-collar.svg'

// 3d model
// import model from './assets/models/base.glb'
import modelOrange from './assets/models/JACK_Orange.glb'
import modelBlackOrange from './assets/models/JACK_BlackOrange.glb'
import modelRed from './assets/models/JACK_red.glb'
import modelBlack from './assets/models/JACK_black.glb'
import modelBlue from './assets/models/JACK blue.glb'

import patchBullDog from './assets/images/patches/bull-dog.png'
import patchMasks from './assets/images/patches/masks.png'
import patchSkull from './assets/images/patches/skull.png'
import patchUsFlag from './assets/images/patches/us-flag.png'

// textures
import textureTransparent from './assets/models/transparent.png'
import texture1 from './assets/models/texture.png'
import texture2 from './assets/models/texture_diffuse.png'
import texture3 from './assets/models/texture_metallic.png'
import texture4 from './assets/models/texture_normal.png'
import texture5 from './assets/models/texture_pbr.png'
import texture6 from './assets/models/texture-orange.png'
import texture7 from './assets/models/texture_white.png'


const App = () => {
  const [formData, setFormData] = useState({
    collar: 'byron',
    body: '#f2e7d5',
    insideLining: '#875b32',
  })
  const [activeOption, setActiveOption] = useState(null)
  const [model, setModel] = useState(modelBlack)
  const [texture, setTexture] = useState(textureTransparent)
  const [patch, setPatch] = useState(null)

  const [patchArray, setPatchArray] = useState([
    {
      type: 'image',
      texture: textureTransparent,
      adjustment: {
        position: [-0.5, 0.5, 0.57],
        rotation: [0, -0.45, -0.1]
      }
    },
    // {
    //   texture: patchSkull,
    //   adjustment: {
    //     position: [0.5, 0.5, 0.57],
    //     rotation: [0, 0.5, 0]
    //   }
    // }
  ])

  const addToPatchArray = () => {
    setPatchArray((prevArray) => {
      // Create a copy of the previous state
      let temp = [...prevArray];

      // Check if an item with the same position already exists
      const index = temp.findIndex((item) => item.position === patch?.position);

      if (index !== -1) {
        // Replace the existing item
        temp[index] = patch;
      } else {
        // Add a new item
        temp.push(patch);
      }

      return temp;
    });

    // setPatch(null);
  };


  useEffect(() => {
    if (patch?.position == 'right-chest') {
      setPatch({
        ...patch,
        adjustment: {
          position: [-0.5, 0.5, 0.6],
          rotation: [0, -0.5, 0]
        }
      })
    } else if (patch?.position == 'left-chest') {
      setPatch({
        ...patch,
        adjustment: {
          position: [0.5, 0.5, 0.57],
          rotation: [0, 0.5, 0]
        }
      })

    } else if (patch?.position == 'above-left-elbow') {
      setPatch({
        ...patch,
        adjustment: {
          position: [1.55, 0.5, -0.2],
          rotation: [-0.3, 1.7, 0]
        }
      })
    }
  }, [patch?.position])

  const handleValue = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  useEffect(() => {
    // setActiveOption(null)
    console.log('formData', formData)
    if (formData.body == 'linear-gradient(135deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 45%, rgba(255,255,255,1) 50%, rgba(0,0,0,1) 55%, rgba(0,0,0,1) 100%)') {
      setModel(modelBlack)
      // setTexture(texture1)
    } else if (formData.body == 'linear-gradient(135deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 45%, rgba(255,0,0,1) 50%, rgba(0,0,0,1) 55%, rgba(0,0,0,1) 100%)') {
      setModel(modelBlackOrange)
      // setTexture(texture2)
    } else if (formData.body == 'linear-gradient(135deg, rgba(255,0,0,1) 0%, rgba(255,0,0,1) 45%, rgba(255,255,255,1) 50%, rgba(255,0,0,1) 55%, rgba(255,0,0,1) 100%)') {
      setModel(modelRed)
      // setTexture(texture3)
    } else if (formData.body == 'linear-gradient(135deg, rgba(8,15,25,1) 0%, rgba(8,15,25,1) 45%, rgba(255,255,255,1) 50%, rgba(8,15,25,1) 55%, rgba(8,15,25,1) 100%)') {
      setModel(modelBlue)
      // setTexture(texture4)
    } else if (formData.body == 'red') {
      // setTexture(texture5)
    } else if (formData.body == 'orange') {
      // setTexture(texture6)
    }
  }, [formData])

  const handlePatch = (e) => {
    setPatch({ ...patch, texture: e.target.value })
  }

  useEffect(() => {
    if (patch?.adjustment && patch?.texture) {
      addToPatchArray()
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
        <div class="jacket-builder">
          <div class="container-fluid">
            <div class="row g-4">
              <div class="col-lg-4 col-12 panel">
                <div class="builder-options h-100">
                  <ul class="options-tabs" id="pills-tab" role="tablist">
                    <li class="nav-item" role="presentation">
                      <button class="nav-link active" onClick={() => setActiveOption(null)} id="pills-material-tab" data-bs-toggle="pill"
                        data-bs-target="#pills-material" type="button" role="tab"
                        aria-controls="pills-material" aria-selected="true">Materials & Colors</button>
                    </li>
                    <li class="nav-item" role="presentation">
                      <button class="nav-link" onClick={() => setActiveOption(null)} id="design-tab" data-bs-toggle="pill" data-bs-target="#design"
                        type="button" role="tab" aria-controls="design" aria-selected="false">Design &
                        Patches</button>
                    </li>
                  </ul>
                  <div class="options-content">
                    <div class="tab-content" id="pills-tabContent">
                      <div class="tab-pane fade show active" id="pills-material" role="tabpanel"
                        aria-labelledby="pills-material-tab" tabindex="0">
                        {!activeOption && <ul class="option-keys">
                          <li>
                            <button data-target="#collar-content" onClick={() => setActiveOption('collar')}>
                              <span class="thumb">
                                <img class="img-fluid" src={byronCollar} alt="" />
                              </span>
                              <div>
                                <h6 class="option">Collar</h6>
                                <h4 class="value">{formData.collar}</h4>
                              </div>
                            </button>
                          </li>
                          <li>
                            <button data-target="#body-color-content" onClick={() => setActiveOption('body')}>
                              <span class="thumb-color">
                                <span class="color"
                                  style={{ backgroundColor: formData.body }}></span>
                              </span>
                              <div>
                                <h6 class="option">Body</h6>
                                <h4 class="value">Bright White Wool</h4>
                              </div>
                            </button>
                          </li>
                          <li>
                            <button onClick={() => setActiveOption('insideLining')}>
                              <span class="thumb-color">
                                <span class="color"
                                  style={{ backgroundColor: formData.insideLining }}></span>
                              </span>
                              <div>
                                <h6 class="option">Inside Lining</h6>
                                <h4 class="value">(+$15.00) Royal Blue Quilted</h4>
                              </div>
                            </button>
                          </li>
                        </ul>}
                        {activeOption == 'collar' && <div class="option-values" id="collar-content">
                          <button class="backbtn" onClick={() => setActiveOption(null)}><IoChevronBack /></button>
                          <h6>Choose Collar</h6>
                          <ul class="option-images">
                            <li>
                              <input type="radio" name="collar" onChange={handleValue} id="collar-regular" />
                              <label for="collar-regular">
                                <img src={regularCollar} alt="" />
                                <span class="txt">Regular</span>
                              </label>
                            </li>
                            <li>
                              <input type="radio" name="collar" onChange={handleValue} id="collar-byron" value='byron' checked />
                              <label for="collar-byron">
                                <img src={byronCollar} alt="" />
                                <span class="txt">Byron</span>
                              </label>
                            </li>
                            <li>
                              <input type="radio" name="collar" onChange={handleValue} id="collar-hoodie" value='hoodie' />
                              <label for="collar-hoodie">
                                <img src={hoodieCollar} alt="" />
                                <span class="txt">Hoodie</span>
                              </label>
                            </li>
                            <li>
                              <input type="radio" name="collar" onChange={handleValue} id="collar-sailor" value='sailor' />
                              <label for="collar-sailor">
                                <img src={sailorCollar} alt="" />
                                <span class="txt">Sailor</span>
                              </label>
                            </li>
                          </ul>
                        </div>}
                        {activeOption === 'body' && <div class="option-values" id="body-color-content">
                          <button class="backbtn" onClick={() => setActiveOption(null)}><IoChevronBack /></button>
                          <h6>Choose Body</h6>
                          <ul class="option-colors">
                            <li>
                              <input value="linear-gradient(135deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 45%, rgba(255,255,255,1) 50%, rgba(0,0,0,1) 55%, rgba(0,0,0,1) 100%)" type="radio" name="body" checked={formData.body === 'linear-gradient(135deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 45%, rgba(255,255,255,1) 50%, rgba(0,0,0,1) 55%, rgba(0,0,0,1) 100%)'} onChange={handleValue} id="body-color-000000" />
                              <label for="body-color-000000">
                                <span class="color" style={{ background: 'linear-gradient(135deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 45%, rgba(255,255,255,1) 50%, rgba(0,0,0,1) 55%, rgba(0,0,0,1) 100%)' }}></span>
                              </label>
                            </li>
                            <li>
                              <input value="linear-gradient(135deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 45%, rgba(255,0,0,1) 50%, rgba(0,0,0,1) 55%, rgba(0,0,0,1) 100%)" type="radio" name="body" checked={formData.body === 'linear-gradient(135deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 45%, rgba(255,0,0,1) 50%, rgba(0,0,0,1) 55%, rgba(0,0,0,1) 100%)'} onChange={handleValue} id="body-color-be6858" />
                              <label for="body-color-be6858">
                                <span class="color" style={{ background: 'linear-gradient(135deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 45%, rgba(255,0,0,1) 50%, rgba(0,0,0,1) 55%, rgba(0,0,0,1) 100%)' }}></span>
                              </label>
                            </li>
                            <li>
                              <input value="linear-gradient(135deg, rgba(255,0,0,1) 0%, rgba(255,0,0,1) 45%, rgba(255,255,255,1) 50%, rgba(255,0,0,1) 55%, rgba(255,0,0,1) 100%)" type="radio" name="body" checked={formData.body === 'linear-gradient(135deg, rgba(255,0,0,1) 0%, rgba(255,0,0,1) 45%, rgba(255,255,255,1) 50%, rgba(255,0,0,1) 55%, rgba(255,0,0,1) 100%)'} onChange={handleValue} id="body-color-ec8e19" />
                              <label for="body-color-ec8e19">
                                <span class="color" style={{ background: 'linear-gradient(135deg, rgba(255,0,0,1) 0%, rgba(255,0,0,1) 45%, rgba(255,255,255,1) 50%, rgba(255,0,0,1) 55%, rgba(255,0,0,1) 100%)' }}></span>
                              </label>
                            </li>
                            <li>
                              <input value="linear-gradient(135deg, rgba(8,15,25,1) 0%, rgba(8,15,25,1) 45%, rgba(255,255,255,1) 50%, rgba(8,15,25,1) 55%, rgba(8,15,25,1) 100%)" type="radio" name="body" checked={formData.body === 'linear-gradient(135deg, rgba(8,15,25,1) 0%, rgba(8,15,25,1) 45%, rgba(255,255,255,1) 50%, rgba(8,15,25,1) 55%, rgba(8,15,25,1) 100%)'} onChange={handleValue} id="body-color-875b32" />
                              <label for="body-color-875b32">
                                <span class="color" style={{ background: 'linear-gradient(135deg, rgba(8,15,25,1) 0%, rgba(8,15,25,1) 45%, rgba(255,255,255,1) 50%, rgba(8,15,25,1) 55%, rgba(8,15,25,1) 100%)' }}></span>
                              </label>
                            </li>
                          </ul>
                        </div>}
                        {activeOption == 'insideLining' && <div class="option-values" id="inside-lining-content">
                          <button class="backbtn" onClick={() => setActiveOption(null)}><IoChevronBack /></button>
                          <h6>Choose Inside Lining</h6>
                          <ul class="option-colors">
                            <li>
                              <input value="#f2e7d5" checked={formData.insideLining == '#f2e7d5'} type="radio" name="insideLining" onChange={handleValue} id="inside-lining-f2e7d5" />
                              <label for="inside-lining-f2e7d5">
                                <span class="color" style={{ backgroundColor: '#f2e7d5' }}></span>
                              </label>
                            </li>
                            <li>
                              <input value="#be6858" checked={formData.insideLining == '#be6858'} type="radio" name="insideLining" onChange={handleValue} id="inside-lining-be6858" />
                              <label for="inside-lining-be6858">
                                <span class="color" style={{ backgroundColor: '#be6858' }}></span>
                              </label>
                            </li>
                            <li>
                              <input value="#ec8e19" checked={formData.insideLining == '#ec8e19'} type="radio" name="insideLining" onChange={handleValue} id="inside-lining-ec8e19" />
                              <label for="inside-lining-ec8e19">
                                <span class="color" style={{ backgroundColor: '#ec8e19' }}></span>
                              </label>
                            </li>
                            <li>
                              <input value="#875b32" checked={formData.insideLining == '#875b32'} type="radio" name="insideLining" onChange={handleValue} id="inside-lining-875b32" />
                              <label for="inside-lining-875b32">
                                <span class="color" style={{ backgroundColor: '#875b32' }}></span>
                              </label>
                            </li>
                            <li>
                              <input value="red" checked={formData.insideLining == 'red'} type="radio" name="insideLining" onChange={handleValue} id="inside-lining-red" />
                              <label for="inside-lining-red">
                                <span class="color" style={{ backgroundColor: 'red' }}></span>
                              </label>
                            </li>
                          </ul>
                        </div>}
                      </div>
                      <div class="tab-pane fade" id="design" role="tabpanel" aria-labelledby="design-tab"
                        tabindex="0">
                        <div class="option-values" id="collar-content">
                          {!patch?.position && <ul class="option-images">
                            <li>
                              <input type="radio" name="collar" onChange={() => setPatch({ ...patch, position: 'right-chest' })}
                                id="patch-right-chest" />
                              <label for="patch-right-chest">
                                <img src={rightChestPatch} alt="" />
                                <span class="txt">Right Chest</span>
                              </label>
                            </li>
                            <li>
                              <input type="radio" name="collar" onChange={() => setPatch({ ...patch, position: 'left-chest' })}
                                id="patch-left-chest" value='byron' />
                              <label for="patch-left-chest">
                                <img src={leftChestPatch} alt="" />
                                <span class="txt">Left Chest</span>
                              </label>
                            </li>
                            <li>
                              <input type="radio" name="collar" onChange={() => setPatch({ ...patch, position: 'above-left-elbow' })} id="patch-above-left-elbow" value='byron' />
                              <label for="patch-above-left-elbow">
                                <img src={aboveLeftElbowPatch} alt="" />
                                <span class="txt">Above Left Elbow</span>
                              </label>
                            </li>
                            <li>
                              <input type="radio" name="collar" onChange={() => setPatch({ ...patch, position: 'above-right-elbow' })} id="above-right-elbow-patch" value='byron' />
                              <label for="above-right-elbow-patch">
                                <img src={aboveRightElbowPatch} alt="" />
                                <span class="txt">Above Right Elbow</span>
                              </label>
                            </li>
                            <li>
                              <input type="radio" name="collar" onChange={() => setPatch({ ...patch, position: 'back' })}
                                id="back-patch" value='byron' />
                              <label for="back-patch">
                                <img src={backPatch} alt="" />
                                <span class="txt">Back</span>
                              </label>
                            </li>
                            <li>
                              <input type="radio" name="collar" onChange={() => setPatch({ ...patch, position: 'below-left-elbow' })} id="below-left-elbow-patch" value='byron' />
                              <label for="below-left-elbow-patch">
                                <img src={belowLeftElbowPatch} alt="" />
                                <span class="txt">Below Left Elbow</span>
                              </label>
                            </li>
                            <li>
                              <input type="radio" name="collar" onChange={() => setPatch({ ...patch, position: 'below-right-elbow' })} id="below-right-elbow-patch" value='byron' />
                              <label for="below-right-elbow-patch">
                                <img src={belowRightElbowPatch} alt="" />
                                <span class="txt">Below Right Elbow</span>
                              </label>
                            </li>
                            <li>
                              <input type="radio" name="collar" onChange={() => setPatch({ ...patch, position: 'bottom-left-sleeve' })} id="bottom-left-sleeve-patch" value='byron' />
                              <label for="bottom-left-sleeve-patch">
                                <img src={bottomLeftSleevePatch} alt="" />
                                <span class="txt">Bottom Left Sleeve</span>
                              </label>
                            </li>
                            <li>
                              <input type="radio" name="collar" onChange={() => setPatch({ ...patch, position: 'bottom-right-sleeve' })} id="bottom-right-sleeve-patch" value='byron' />
                              <label for="bottom-right-sleeve-patch">
                                <img src={bottomRightSleevePatch} alt="" />
                                <span class="txt">Bottom Right Sleeve</span>
                              </label>
                            </li>
                            <li>
                              <input type="radio" name="collar" onChange={() => setPatch({ ...patch, position: 'left-shoulder' })} id="left-shoulder-patch" value='byron' />
                              <label for="left-shoulder-patch">
                                <img src={leftShoulderPatch} alt="" />
                                <span class="txt">Left Shoulder</span>
                              </label>
                            </li>
                            <li>
                              <input type="radio" name="collar" onChange={() => setPatch({ ...patch, position: 'right-shoulder' })} id="right-shoulder-patch" value='byron' />
                              <label for="right-shoulder-patch">
                                <img src={rightShoulderPatch} alt="" />
                                <span class="txt">Right Shoulder</span>
                              </label>
                            </li>
                          </ul>}
                          {(patch?.position && !patch.type) && <div className="option-values">
                            <button class="backbtn" onClick={() => setPatch(null)}><IoChevronBack /></button>
                            <ul class="option-images">
                              <li>
                                <input type="radio" name="patch-type" onChange={() => setPatch({ ...patch, type: 'image' })} id="patch-image" />
                                <label for="patch-image">
                                  <img src={patchIcon} alt="" />
                                </label>
                              </li>
                              <li>
                                <input type="radio" name="patch-type" onChange={() => setPatch({ ...patch, type: 'text' })} id="patch-text" />
                                <label for="patch-text">
                                  <img src={letterIcon} alt="" />
                                </label>
                              </li>
                              <li>
                                <input type="radio" name="patch-type" onChange={() => setPatch({ ...patch, type: 'upload' })} id="patch-upload" />
                                <label for="patch-upload">
                                  <img src={uploadIcon} alt="" />
                                </label>
                              </li>
                            </ul>
                          </div>}
                          {patch?.type == 'image' ? <div className="option-values">
                            <button class="backbtn" onClick={() => setPatch(null)}><IoChevronBack /></button>
                            <ul class="option-images">
                              <li>
                                <input type="radio" name="patch" value={patchBullDog} onChange={handlePatch} id="patch-bull-dog" />
                                <label for="patch-bull-dog">
                                  <img src={patchBullDog} alt="" />
                                </label>
                              </li>
                              <li>
                                <input type="radio" name="patch" value={patchMasks} onChange={handlePatch} id="patch-masks" />
                                <label for="patch-masks">
                                  <img src={patchMasks} alt="" />
                                </label>
                              </li>
                              <li>
                                <input type="radio" name="patch" value={patchSkull} onChange={handlePatch} id="patch-skull" />
                                <label for="patch-skull">
                                  <img src={patchSkull} alt="" />
                                </label>
                              </li>
                              <li>
                                <input type="radio" name="patch" value={patchUsFlag} onChange={handlePatch} id="patch-flag" />
                                <label for="patch-flag">
                                  <img src={patchUsFlag} alt="" />
                                </label>
                              </li>
                            </ul>
                          </div> : patch?.type == 'text' ? <>
                            <button class="backbtn" onClick={() => setPatch(null)}><IoChevronBack /></button>
                            <div className='input-patch'>
                              <input type="text" placeholder='upto 3 character' onChange={handleTextInput} maxLength={3} />
                              <button onClick={addToPatchArray}>Add</button>
                            </div>
                          </> : patch?.type == 'upload' && <div className='upload-patch'>
                            <button class="backbtn" onClick={() => setPatch(null)}><IoChevronBack /></button>
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
              <div class="col-lg-8 col-12 panel">
                <div class="model-wrapper h-100">
                  <ProductViewer
                    key={model}
                    // texturePath={texture} 
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
