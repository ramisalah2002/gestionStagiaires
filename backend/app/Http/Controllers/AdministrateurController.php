<?php

namespace App\Http\Controllers;

use App\Models\Administrateur;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;


class AdministrateurController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $administrateur = Administrateur::all();
        return response()->json($administrateur);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'nom' => 'required',
            'prenom' => 'required',
            'email' => 'required|email|unique:encadrant',
            'password' => 'required',
            'telephone' => 'required',
            'dateNaissance' => 'required|date',
            'genre' => 'required',
            'CIN' => 'required|unique:encadrant',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        $imageData = null;
        if ($request->file('image')) {
            $imageData = file_get_contents($request->file('image'));
        }

        $administrateur = new Administrateur;
        $administrateur->nom = $request->input('nom');
        $administrateur->prenom = $request->input('prenom');
        $administrateur->email = $request->input('email');
        // Encrypt the password before storing it
        $administrateur->password = \Hash::make($request->input('password'));
        $administrateur->telephone = $request->input('telephone');
        $administrateur->dateNaissance = $request->input('dateNaissance');
        $administrateur->genre = $request->input('genre');
        $administrateur->CIN = $request->input('CIN');
        $administrateur->image = $imageData;
        $administrateur->save();
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $administrateur = Administrateur::find($id);
        return response()->json($administrateur);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'nom' => 'required',
            'prenom' => 'required',
            'email' => 'required|email',
            'password' => 'required',
            'telephone' => 'required',
            'dateNaissance' => 'required|date',
            'genre' => 'required',
            'CIN' => 'required',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        $administrateur = Administrateur::find($id);

        if ($request->file('image')) {
            $imageData = file_get_contents($request->file('image'));
            $administrateur->image = $imageData;
        }

        $administrateur->nom = $request->input('nom');
        $administrateur->prenom = $request->input('prenom');
        $administrateur->email = $request->input('email');
        $administrateur->password = \Hash::make($request->input('password'));
        $administrateur->telephone = $request->input('telephone');
        $administrateur->dateNaissance = $request->input('dateNaissance');
        $administrateur->genre = $request->input('genre');
        $administrateur->CIN = $request->input('CIN');
        $administrateur->CNE = $request->input('CNE');

        $administrateur->save();

        return response()->json('');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $administrateur = Administrateur::find($id);
        $administrateur->delete();
        return response()->json('');
    }
}
