const router = require("express").Router();
const https = require("https");

router.post("/", (req, res) => {
  const params = JSON.stringify({
    email: req.body.email,
    amount: req.body.amount,
  });

  const options = {
    hostname: "api.paystack.co",
    port: 443,
    path: "/transaction/initialize",
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      "Content-Type": "application/json",
    },
  };

  const reqPaystack = https
    .request(options, (resPaystack) => {
      let data = "";

      resPaystack.on("data", (chunk) => {
        data += chunk;
      });

      resPaystack.on("end", () => {
        const newData = JSON.parse(data);
        res.status(200).json(newData);
        console.log(JSON.parse(data));
      });
    })
    .on("error", (error) => {
      console.error(error);
    });

  reqPaystack.write(params);
  reqPaystack.end();
});

module.exports = router;
