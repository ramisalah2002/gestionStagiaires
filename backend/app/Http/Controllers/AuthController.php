<?php

namespace App\Http\Controllers;

use App\Models\Administrateur;
use App\Models\Encadrant;
use App\Models\Stagiaire;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $fields = $request->validate([
            'email' => 'required|string',
            'password' => 'required|string',
        ]);

        // Check Email
        $user = Administrateur::where('email', $fields['email'])->first()
            ?? Encadrant::where('email', $fields['email'])->first()
            ?? Stagiaire::where('email', $fields['email'])->first();

        //Check password
        if (!$user || !Hash::check($fields['password'], $user->password)) {
            return response([
                'message' => 'Incorrect informations'
            ], 401);
        }

        $token = $user->createToken($user->getTable().'Token')->plainTextToken;

        $response = [
            'user' => $user,
            'token' => $token
        ];

        return response($response, 201);
    }

    public function logout(Request $request) {
        $user = auth()->user();
        if ($user) {
            $user->tokens()->delete();
        }
        return[
            'message' => 'Disconnected'
        ];
    }
}
