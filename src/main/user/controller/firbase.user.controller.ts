import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { FirebaseUserService } from "../service/firebase.user.service";

@Controller('firebase-user')
export class UserController {
    constructor(
        private readonly userService: FirebaseUserService,
    ) { }

    @Post()
    createUser(@Body() body: any) {
        return this.userService.createUser(body);
    }

    @Get('by-gender')
    getUserByGender(@Query('gender') gender: string) {
        return this.userService.getUsersByGender(gender);
    }

    @Get(':id')
    getUser(@Param('id') id: string) {
        return this.userService.getUserById(id);
    }

    @Get()
    getAllUsers() {
        return this.userService.getAllUsers();
    }

}