const echo = require("../controller/echo");
const req = require("supertest");
const express = require("express");
const bodyParser = require("body-parser");

const prepare = () => req(express().use(bodyParser.json()).use(echo));

describe("/echo", () => {
	describe("GET /echo/echo_get", () => {
		it("basic case", async () => {
			var res = await prepare().get("/echo_get");
			expect(res.status).toBe(200);
			expect(res.body).toEqual({message: "Echo from router..."});
        });
	});
    describe("GET /echo/echo_qs", () =>{
        it("basic case", async () =>{
            var res = await prepare().get("/echo_qs?title=book&page=2");
            expect(res.status).toBe(200);
            expect(res.body).toEqual({title: "book", page: "2"});
        });
    });
    describe("GET /echo/echo_params/{params}", () => {
        it("basic case", async () => {
            var res = await prepare().get("/echo_params/0");
            expect(res.status).toBe(200);
            expect(res.body).toEqual({params: "0"});
        });
    });
    describe("POST /echo/echo_post", () => {
        it("basic case", async () => {
            doc = {id: 1, name: "elon musk"};
            var res = await prepare().post("/echo_post").send(doc);
            expect(res.status).toBe(200);
            expect(res.body).toEqual({id: 1, name: "elon musk"});
        });
    });
});