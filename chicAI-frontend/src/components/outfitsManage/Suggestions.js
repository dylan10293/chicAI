const Suggestions = () => {
  return [
    {
      id: 1,
      items: [
        { type: "top", name: "Red Sweater", tags: ["cozy", "warm"] },
        { type: "bottom", name: "Black Pants", tags: ["formal", "winter"] },
      ],
      description: "Cozy winter outfit with a formal touch.",
      tags: ["cozy", "formal", "winter"],
    },
    {
      id: 2,
      items: [
        { type: "top", name: "Green Shirt", tags: ["casual", "summer"] },
        { type: "bottom", name: "Beige Pants", tags: ["neutral", "light"] },
      ],
      description: "Light and casual summer outfit.",
      tags: ["summer", "light", "casual"],
    },
  ];
};

export default Suggestions;
