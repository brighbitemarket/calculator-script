<script>
document.addEventListener("DOMContentLoaded", function () {
  console.log("Script is running");

  const form = document.getElementById("lawnServiceForm");
  const serviceCheckboxes = form.querySelectorAll('input[name="service"]');
  const lotSizeInput = form.querySelector('input[name="lotSize"]');
  const frequencySelect = form.querySelector('select[name="frequency"]');
  const totalPriceDisplay = document.getElementById("totalPrice");

  console.log("Form found: ", form);
  console.log("Service checkboxes: ", serviceCheckboxes);
  console.log("Lot size input: ", lotSizeInput);
  console.log("Frequency select: ", frequencySelect);
  console.log("Total price display: ", totalPriceDisplay);

  const baseLotSize = 0.25;
  const additionalLotCharge = 20;

  function calculateTotalPrice() {
    let totalPrice = 0;

    serviceCheckboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        totalPrice += parseFloat(checkbox.value);
      }
    });

    const lotSize = parseFloat(lotSizeInput.value) || baseLotSize;
    if (lotSize > baseLotSize) {
      const extraLotSize = lotSize - baseLotSize;
      const lotCharge = Math.ceil(extraLotSize / baseLotSize) * additionalLotCharge;
      totalPrice += lotCharge;
    }

    const frequencyMultiplier = parseFloat(frequencySelect.value);
    if (frequencyMultiplier === 1) {
      totalPrice *= 4;
    } else if (frequencyMultiplier === 0.5) {
      totalPrice *= 2;
    }

    totalPriceDisplay.textContent = totalPrice.toFixed(2);
  }

  serviceCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", calculateTotalPrice);
  });
  lotSizeInput.addEventListener("input", calculateTotalPrice);
  frequencySelect.addEventListener("change", calculateTotalPrice);

  calculateTotalPrice();

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const totalPrice = parseFloat(totalPriceDisplay.textContent);
    const checkoutUrl = `https://yourcheckoutpage.com?total=${totalPrice}`;
    window.location.href = checkoutUrl;
  });
});
</script>
