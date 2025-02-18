import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import './App.css'

import ProductViewer from './components/ProductModel'

import { IoChevronBack } from "react-icons/io5";

// images
import leftChestPatch from './assets/images/left-chest.svg'
import rightChestPatch from './assets/images/right-chest.svg'
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
// import texture1 from './assets/models/texture.png'
// import texture2 from './assets/models/texture_diffuse.png'
// import texture3 from './assets/models/texture_metallic.png'
// import texture4 from './assets/models/texture_normal.png'
// import texture5 from './assets/models/texture_pbr.png'
// import texture6 from './assets/models/texture-orange.png'
// import texture7 from './assets/models/texture_white.png'


const App = () => {
  const [formData, setFormData] = useState({
    collar: 'byron',
    body: '#f2e7d5',
    insideLining: '#875b32',
  })
  const [patchPosition,setPatchPosition] = useState(null)
  const [activeOption, setActiveOption] = useState(null)
  const [model, setModel] = useState(modelOrange)
  // const [texture, setTexture] = useState(texture1)
  const handleValue = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  useEffect(() => {
    setActiveOption(null)
    if (formData.body == '#f2e7d5') {
      // setTexture(texture1)
      // setModel()
    } else if (formData.body == '#be6858') {
      // setTexture(texture2)
    } else if (formData.body == '#ec8e19') {
      // setTexture(texture3)
    } else if (formData.body == '#875b32') {
      // setTexture(texture4)
    } else if (formData.body == 'red') {
      // setTexture(texture5)
    } else if (formData.body == 'orange') {
      // setTexture(texture6)
    }
  }, [formData])

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
                        {activeOption == 'body' && <div class="option-values" id="body-color-content">
                          <button class="backbtn" onClick={() => setActiveOption(null)}><IoChevronBack /></button>
                          <h6>Choose Body</h6>
                          <ul class="option-colors">
                            <li>
                              <input value="#f2e7d5" type="radio" name="body" checked={formData.body == '#f2e7d5'} onChange={handleValue} id="body-color-f2e7d5" />
                              <label for="body-color-f2e7d5">
                                <span class="color" style={{ backgroundColor: '#f2e7d5' }}></span>
                              </label>
                            </li>
                            <li>
                              <input value="#be6858" type="radio" name="body" checked={formData.body == '#be6858'} onChange={handleValue} id="body-color-be6858" />
                              <label for="body-color-be6858">
                                <span class="color" style={{ backgroundColor: '#be6858' }}></span>
                              </label>
                            </li>
                            <li>
                              <input value="#ec8e19" type="radio" name="body" checked={formData.body == '#ec8e19'} onChange={handleValue} id="body-color-ec8e19" />
                              <label for="body-color-ec8e19">
                                <span class="color" style={{ backgroundColor: '#ec8e19' }}></span>
                              </label>
                            </li>
                            <li>
                              <input value="#875b32" type="radio" name="body" checked={formData.body == '#875b32'} onChange={handleValue} id="body-color-875b32" />
                              <label for="body-color-875b32">
                                <span class="color" style={{ backgroundColor: '#875b32' }}></span>
                              </label>
                            </li>
                            <li>
                              <input value="red" type="radio" name="body" checked={formData.body == 'red'} onChange={handleValue} id="body-color-red" />
                              <label for="body-color-red">
                                <span class="color" style={{ backgroundColor: 'red' }}></span>
                              </label>
                            </li>
                            <li>
                              <input value="orange" type="radio" name="body" checked={formData.body == 'orange'} onChange={handleValue} id="body-color-orange" />
                              <label for="body-color-orange">
                                <span class="color" style={{ backgroundColor: 'orange' }}></span>
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
                          {!patchPosition && <ul class="option-images">
                            <li>
                              <input type="radio" name="collar" onChange={()=> setPatchPosition('right-chest')} id="patch-right-chest" />
                              <label for="patch-right-chest">
                                <img src={rightChestPatch} alt="" />
                                <span class="txt">Right Chest</span>
                              </label>
                            </li>
                            <li>
                              <input type="radio" name="collar" onChange={()=> setPatchPosition('left-chest')} id="collar-byron" value='byron' />
                              <label for="collar-byron">
                                <img src={leftChestPatch} alt="" />
                                <span class="txt">Left Chest</span>
                              </label>
                            </li>
                          </ul>}
                          {patchPosition && <div className="option-values">
                            <button class="backbtn" onClick={() => setActiveOption(null)}><IoChevronBack /></button>
                            <ul class="option-images">
                            <li>
                              <input type="radio" name="collar" onChange={handleValue} id="patch-right-chest" />
                              <label for="patch-right-chest">
                                <img src={patchBullDog} alt="" />
                              </label>
                            </li>
                            <li>
                              <input type="radio" name="collar" onChange={handleValue} id="patch-right-chest" />
                              <label for="patch-right-chest">
                                <img src={patchMasks} alt="" />
                              </label>
                            </li>
                            <li>
                              <input type="radio" name="collar" onChange={handleValue} id="patch-right-chest" />
                              <label for="patch-right-chest">
                                <img src={patchSkull} alt="" />
                              </label>
                            </li>
                            <li>
                              <input type="radio" name="collar" onChange={handleValue} id="patch-right-chest" />
                              <label for="patch-right-chest">
                                <img src={patchUsFlag} alt="" />
                              </label>
                            </li>
                            </ul>
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
                    modelPath={model} />
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
