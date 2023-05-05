<?php

namespace App\Http\Controllers;

use App\Models\Administrateur;
use Illuminate\Http\Request;

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
        $administrateur = new Administrateur;
        $administrateur->nom = $request->input('nom');
        $administrateur->prenom = $request->input('prenom');
        $administrateur->email = $request->input('email');
        $administrateur->password = $request->input('password');
        $administrateur->telephone = $request->input('telephone');
        $administrateur->dateNaissance = $request->input('dateNaissance');
        $administrateur->genre = $request->input('genre');
        $administrateur->CIN = $request->input('CIN');

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
        $administrateur = Administrateur::find($id);
        $administrateur->update($request->all());
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
