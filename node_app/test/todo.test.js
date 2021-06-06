const todo = require("../controller/todo");
const req = require("supertest");
const express = require("express");
const bodyParser = require("body-parser");
const connectdb = require("../../db/connect");

const prepare = () => req(express().use(bodyParser.json()).use(express.json()).use(todo));

beforeAll(async() => {
    await connectdb();
})

let testId;

describe("/no_auth", () => {
	describe("GET /no_auth/todos", () => {
		it("basic case", async () => {
			var res = await prepare().get("/todos");
			expect(res.status).toBe(200);
        });
	});
    describe("POST /no_auth/todos", () => {
        it("basic case", async () => {
            var res = await prepare().post("/todos").send({title:"Day 1 work"});
            testId = res.body.data[0]._id;
            expect(res.status).toBe(200);
        });
        it("400 Invalid title", async () => {
            var res = await prepare().post("/todos").send({});
            expect(res.status).toBe(400);
            expect(res.body).toEqual({error: "Todo validation failed: title: Please add a title", data: {} });
        });
    });
    describe("GET /no_aunt/todos/{_id}", () => {
        it("basic case", async () => {
            var res = await prepare().get('/todos/'+testId);
            expect(res.status).toBe(200);
        });
        it("400 Mongo Cast Error", async() => {
            var res = await prepare().get("/todos/60bca4f237");
            expect(res.status).toBe(400);
            expect(res.body).toEqual({ error: "Mongo Cast Error (Invalid ObjectID)", data: {} });
        });
        it("400 Todo not found", async () => {
            var res = await prepare().get("/todos/60a4d13c33566fe49db63dba");
            expect(res.status).toBe(400);
            expect(res.body).toEqual({ error: "Todo not found", data: {} });
        });
    });
    describe("PUT /no_auth/todos/{_id}", () => {
        it("basic case", async () => {
            var res = await prepare().put("/todos/"+testId).send({title: "Day 10 work!"});
            expect(res.status).toBe(200);
            expect(res.body.data.title).toBe("Day 10 work!");
        });
        it("400 Mongo cast Error", async () => {
            var res = await prepare().put("/todos/60bca4f237").send({title:"Day 10 work!"});
            expect(res.status).toBe(400);
            expect(res.body).toEqual({ error: "Mongo Cast Error (Invalid ObjectID)", data: {} });
        });
        it("400 Todo not found", async () => {
            var res = await prepare().put("/todos/60a4d13c33566fe49db63dba").send({title:"Day 10 work!"});
            expect(res.status).toBe(400);
            expect(res.body).toEqual({ error: "Todo not found", data: {} });
        });
        it("400 Invalid Title", async () => {
            var res = await prepare().put("/todos/"+testId).send({title: 123});
            expect(res.status).toBe(400);
            expect(res.body).toEqual({ error: "Invalid Title", data: {} });
        });
    });
    describe("DELETE /no_auth/todos/{_id}", () => {
        it("basic case", async () => {
            var res = await prepare().delete("/todos/"+testId);
            expect(res.status).toBe(200);
        });
        it("400 Mongo cast Error", async () => {
            var res = await prepare().delete("/todos/60bca4f237");
            expect(res.status).toBe(400);
            expect(res.body).toEqual({ error: "Mongo Cast Error (Invalid ObjectID)", data: {} });
        });
        it("400 Todo not found", async () => {
            var res = await prepare().delete("/todos/60a4d13c33566fe49db63dba");
            expect(res.status).toBe(400);
            expect(res.body).toEqual({ error: "Todo not found", data: {} });
        });
    });
});
