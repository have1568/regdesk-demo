import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from "../src/modules/hello/app.module";

describe('TodoController (e2e)', () => {
    let app: INestApplication;
    let createdId: string;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule], // 直接引入 AppModule
        }).compile();

        app = moduleFixture.createNestApplication();
        app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
        await app.init();
    });

    afterAll(async () => {
        await app.close();
    });

    it('/POST todos', async () => {
        const response = await request(app.getHttpServer())
            .post('/todos')
            .send({ title: 'Test Todo', description: 'E2E test' });

        expect(response.body).toHaveProperty('id');
        expect(response.body.title).toBe('Test Todo');
        expect(response.body.description).toBe('E2E test');
        createdId = response.body.id;
    });

    it('/GET todos/:id', async () => {
        const response = await request(app.getHttpServer())
            .get(`/todos/${createdId}`)
            .expect(200);

        expect(response.body.id).toBe(createdId);
        expect(response.body.title).toBe('Test Todo');
    });

    it('/PUT todos/:id', async () => {
        const response = await request(app.getHttpServer())
            .put(`/todos/${createdId}`)
            .send({ title: 'Updated Title', description: 'Updated Desc' })
            .expect(200);

        expect(response.body.title).toBe('Updated Title');
    });

    it('/PUT todos/:id/complete', async () => {
        const response = await request(app.getHttpServer())
            .put(`/todos/${createdId}/complete`)
            .expect(200);

        expect(response.body.completed).toBe(true);
    });

    it('/GET todos (pagination)', async () => {
        const response = await request(app.getHttpServer())
            .get('/todos?page_index=1&page_size=10&search=Updated')
            .expect(200);

        expect(response.body.items.length).toBeGreaterThanOrEqual(1);
        expect(response.body.total).toBeGreaterThanOrEqual(1);
    });

    it('/DELETE todos/:id', async () => {
        const response = await request(app.getHttpServer())
            .delete(`/todos/${createdId}`)
            .expect(200);

        expect(response.body.id).toBe(createdId);
    });
});
