<?php
include 'includes/header.php';
$page = 'home';
?>
<main>
    <div class="jacket-builder">
        <div class="container-fluid">
            <div class="row g-4">
                <div class="col-lg-4 col-12 panel">
                    <div class="builder-options h-100">
                        <ul class="options-tabs" id="pills-tab" role="tablist">
                            <li class="nav-item" role="presentation">
                                <button class="nav-link active" id="pills-material-tab" data-bs-toggle="pill"
                                    data-bs-target="#pills-material" type="button" role="tab"
                                    aria-controls="pills-material" aria-selected="true">Materials & Colors</button>
                            </li>
                            <li class="nav-item" role="presentation">
                                <button class="nav-link" id="design-tab" data-bs-toggle="pill" data-bs-target="#design"
                                    type="button" role="tab" aria-controls="design" aria-selected="false">Design &
                                    Patches</button>
                            </li>
                        </ul>
                        <div class="options-content">
                            <div class="tab-content" id="pills-tabContent">
                                <div class="tab-pane fade show active" id="pills-material" role="tabpanel"
                                    aria-labelledby="pills-material-tab" tabindex="0">
                                    <ul class="option-keys">
                                        <li>
                                            <button data-target="#collar-content">
                                                <span class="thumb">
                                                    <img class="img-fluid" src="images/byron-collar.svg" alt="">
                                                </span>
                                                <div>
                                                    <h6 class="option">Collar</h6>
                                                    <h4 class="value">Byron</h4>
                                                </div>
                                            </button>
                                        </li>
                                        <li>
                                            <button data-target="#body-color-content">
                                                <span class="thumb-color">
                                                    <span class="color"
                                                        style="background-color: rgb(242, 231, 213);"></span>
                                                </span>
                                                <div>
                                                    <h6 class="option">Body</h6>
                                                    <h4 class="value">Bright White Wool</h4>
                                                </div>
                                            </button>
                                        </li>
                                        <li>
                                            <button>
                                                <span class="thumb-color">
                                                    <span class="color"
                                                        style="background-color: rgb(242, 231, 213);"></span>
                                                </span>
                                                <div>
                                                    <h6 class="option">Inside Lining</h6>
                                                    <h4 class="value">(+$15.00) Royal Blue Quilted</h4>
                                                </div>
                                            </button>
                                        </li>
                                    </ul>
                                    <div class="option-values" id="collar-content">
                                        <button class="backbtn"><i class="fa-solid fa-chevron-left"></i></button>
                                        <h6>Choose Collar</h6>
                                        <ul class="option-images">
                                            <li>
                                                <input type="radio" name="collar" id="collar-regular">
                                                <label for="collar-regular">
                                                    <img src="images/regular-collar.svg" alt="">
                                                    <span class="txt">Regular</span>
                                                </label>
                                            </li>
                                            <li>
                                                <input type="radio" name="collar" id="collar-byron" checked>
                                                <label for="collar-byron">
                                                    <img src="images/byron-collar.svg" alt="">
                                                    <span class="txt">Byron</span>
                                                </label>
                                            </li>
                                            <li>
                                                <input type="radio" name="collar" id="collar-hoodie">
                                                <label for="collar-hoodie">
                                                    <img src="images/hoodie-collar.svg" alt="">
                                                    <span class="txt">Hoodie</span>
                                                </label>
                                            </li>
                                            <li>
                                                <input type="radio" name="collar" id="collar-sailor">
                                                <label for="collar-sailor">
                                                    <img src="images/sailor-collar.svg" alt="">
                                                    <span class="txt">Sailor</span>
                                                </label>
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="option-values" id="body-color-content">
                                        <button class="backbtn"><i class="fa-solid fa-chevron-left"></i></button>
                                        <h6>Choose Body</h6>
                                        <ul class="option-colors">
                                            <li>
                                                <input value="models/texture.png" type="radio"
                                                    name="body-color" id="body-color-f2e7d5">
                                                <label for="body-color-f2e7d5">
                                                    <span class="color" style="background-color: #000000;"></span>
                                                </label>
                                            </li>
                                            <li>
                                                <input value="models/texture_metallic.png" type="radio"
                                                    name="body-color" id="body-color-be6858">
                                                <label for="body-color-be6858">
                                                    <span class="color" style="background-color: #be6858"></span>
                                                </label>
                                            </li>
                                            <li>
                                                <input value="models/texture_normal.png" type="radio" name="body-color" id="body-color-ec8e19">
                                                <label for="body-color-ec8e19">
                                                    <span class="color" style="background-color: #ec8e19"></span>
                                                </label>
                                            </li>
                                            <li>
                                                <input value="models/texture_roughness.png" type="radio" name="body-color" id="body-color-875b32">
                                                <label for="body-color-875b32">
                                                    <span class="color" style="background-color: #875b32"></span>
                                                </label>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="tab-pane fade" id="design" role="tabpanel" aria-labelledby="design-tab"
                                    tabindex="0">...</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-8 col-12 panel">
                    <div class="model-wrapper h-100">
                        <model-viewer class="model-viewer"
                            alt="Neil Armstrong's Spacesuit from the Smithsonian Digitization Programs Office and National Air and Space Museum"
                            src="models/base.glb" shadow-intensity="1" camera-controls touch-action="pan-y">
                        </model-viewer>

                    </div>
                </div>
            </div>
        </div>
    </div>
</main>
<?php
include 'includes/footer.php';
$page = 'home';
?>


<script>
$(".option-keys button").click(function() {
    $(".option-keys").hide()
    $($(this).data('target')).show()
})
$(".backbtn").click(function() {
    $(".option-values").hide()
    $(".option-keys").show()
})
</script>

<!-- <script type="module" src="https://ajax.googleapis.com/ajax/libs/model-viewer/4.0.0/model-viewer.min.js"></script> -->
<!-- <script type="module" src="js/model-viewer.js"></script> -->
<script type="module" src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"></script>
<script type="module">
document.addEventListener("DOMContentLoaded", function() {
    const modelViewerTexture = document.querySelector(".model-viewer");

    if (!modelViewerTexture) {
        console.error("model-viewer element not found");
        return;
    }

    const textureName = document.querySelector("#texture-name");
    const imageName = document.querySelector("#image-name");

    const createAndApplyTexture = async (channel, event) => {
        const material = modelViewerTexture.model?.materials[0];

        if (!material) {
            console.error("Material not found");
            return;
        }

        if (event.target.value === "None") {
            console.log('setting null')
            material[channel]?.setTexture(null);
            // textureName.innerText = "None";
            // imageName.innerText = "None";
        } else if (event.target.value) {
            try {
                console.log('setting texture')
                const texture = await modelViewerTexture.createTexture(event.target.value);
                texture.name = event.target.name.replace(/ /g, "_").toLowerCase();
                material[channel]?.setTexture(texture);
                // textureName.innerText = texture.name;
                // imageName.innerText = texture.source.name;
            } catch (error) {
                console.error("Error applying texture:", error);
            }
        }
    };

    document.querySelectorAll(`[name="body-color"]`).forEach(input => {
        input.addEventListener("change", async function(event) {
            createAndApplyTexture("normalTexture", event);
        });
    });
});
</script>