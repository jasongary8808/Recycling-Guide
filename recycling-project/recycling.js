const search = document.getElementById("search");
const result = document.getElementById("result");

/*
  Rules for how each material should be handled
*/
const materialRules = {
  plastic: {
    status: "Recycle",
    class: "recycle",
    icon: "♻️",
    info: "Recycle if clean and accepted by local programs."
  },
  metal: {
    status: "Recycle",
    class: "recycle",
    icon: "♻️",
    info: "Recycle with metals after rinsing."
  },
  glass: {
    status: "Recycle",
    class: "recycle",
    icon: "♻️",
    info: "Remove lids and recycle glass containers."
  },
  paper: {
    status: "Recycle",
    class: "recycle",
    icon: "♻️",
    info: "Recycle if clean and dry."
  },
  fabric: {
    status: "Trash",
    class: "trash",
    icon: "🗑️",
    info: "Most fabrics are not recyclable curbside. Consider donating."
  },
  electronics: {
    status: "Special Handling",
    class: "special",
    icon: "⚠️",
    info: "Take to an e-waste recycling facility."
  },
  mixed: {
    status: "Trash",
    class: "trash",
    icon: "🗑️",
    info: "Mixed materials cannot be recycled together. Disassemble if possible."
  }
};

/*
  Keyword → material inference map
  This allows the app to scale without manual item lists
*/
const materialInference = {
  bottle: ["plastic"],
  plastic: ["plastic"],
  can: ["metal"],
  aluminum: ["metal"],
  jar: ["glass"],
  glass: ["glass"],
  box: ["paper"],
  cardboard: ["paper"],
  paper: ["paper"],
  battery: ["electronics"],
  charger: ["electronics"],
  phone: ["electronics"],
  cable: ["electronics"],
  cord: ["electronics"],
  clothing: ["fabric"],
  fabric: ["fabric"],
  shirt: ["fabric"],
  pants: ["fabric"],
  shoe: ["mixed"],
  toy: ["mixed"],
  stuffed: ["fabric", "plastic"]
};

search.addEventListener("input", () => {
  const query = search.value.toLowerCase().trim();

  if (!query) {
    result.innerHTML = "";
    return;
  }

  let inferredMaterials = [];

  Object.keys(materialInference).forEach(keyword => {
    if (query.includes(keyword)) {
      inferredMaterials.push(...materialInference[keyword]);
    }
  });

  if (inferredMaterials.length === 0) {
    result.innerHTML = `
      <div class="status special">⚠️ Unknown Item</div>
      <p class="info">
        This item’s recyclability depends on its materials.
        Try describing what it’s made of (plastic, metal, fabric, etc.).
      </p>
    `;
    return;
  }

  const uniqueMaterials = [...new Set(inferredMaterials)];
  const materialType =
    uniqueMaterials.length > 1 ? "mixed" : uniqueMaterials[0];

  const rule = materialRules[materialType];

  result.innerHTML = `
    <div class="status ${rule.class}">
      ${rule.icon} ${rule.status}
    </div>
    <p class="info">
      <strong>Likely materials:</strong> ${uniqueMaterials.join(", ")}<br />
      ${rule.info}
    </p>
  `;
});
