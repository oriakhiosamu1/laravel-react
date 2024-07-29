<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignUpRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    //LOGIN FUNCTION
    public function login(LoginRequest $request){
        $credentials = $request->validated();
        if(!Auth::attempt($credentials)){
            return response([
                'message' => 'Invalid credentials'
            ], 422);
        }

        /** @var User $user */
        $user = Auth::user();
        $token = $user->createToken('main')->plainTextToken;
        return response([
            'user' => $user,
            'token' => $token
        ]);
    }

    // REGISTER FUNCTION
    public function signup(SignUpRequest $request){
        $data = $request->validated();
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password'])
        ]);

        /** @var User $user */
        $token = $user->createToken('main')->plainTextToken;

        return response([
            'user' => $user,
            'token' => $token
        ]);
    }

    // LOGOUT FUNCTION
    public function logout(Request $request){
        $user = $request->user();

        /** @var User $user */
        $user->currentAccessToken()->delete();

        return response('', 204);
    }
}
