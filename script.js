console.log("Hello TensorFlow");

/**
 * Get the Aup data reduced to just the variables we are interested
 * and cleaned of missing data.
 */
async function getData() {
  const aupDataResponse = await fetch("./aupData.JSON");
  const aupData = await aupDataResponse.json();
  console.log("Aup Data", aupDataResponse);
  const cleaned = aupData
    .map((aup) => ({
      itemQuantity: aup.ITEMQUANTITY,
      bid: aup.BID1,
      // region: aup.REGION,
      // bidItemNumber: aup.BIDITEMNUMBER,
      // description: aup.DESCR,
      // vendor: aup.BID1VENDNAME,

    }))
    .filter((aup) =>  aup.bid != null && aup.itemQuantity != null
                    // && aup.description != null
                    // && aup.bidItemNumber != null
                    // && aup.region != null
                    // && aup.vendor != null
                    );

  return cleaned;
}

async function run() {
  // Load and plot the original input data that we are going to train on.
  const data = await getData();
  const values = data.map((d) => ({
    x: d.itemQuantity,
    y: d.bid,
  }));

  tfvis.render.scatterplot(
    { name: "Quantity v Bid" },
    { values },
    {
      xLabel: "ItemQuantity",
      yLabel: "Bid",
      height: 300,
    }
  );
}