<?php

namespace App\Http\Controllers;

use App\Models\Utilisateur;
use Illuminate\Http\Request;

class UtilisateurController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $utilisateur = Utilisateur::all();
        return response()->json($utilisateur);
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
        $utilisateur = new Utilisateur;
        $utilisateur->nom = $request->input('nom');
        $utilisateur->prenom = $request->input('prenom');
        $utilisateur->email = $request->input('email');
        $utilisateur->password = $request->input('password');
        $utilisateur->telephone = $request->input('telephone');
        $utilisateur->dateNaissance = $request->input('dateNaissance');
        $utilisateur->genre = $request->input('genre');
        $utilisateur->CIN = $request->input('CIN');
        $utilisateur->CNE = $request->input('CNE');

        $utilisateur->save();
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $utilisateur = Utilisateur::find($id) ;
        return response()->json($utilisateur) ;
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
        $utilisateur = Utilisateur::find($id);
        $utilisateur->update($request->all());
        return response()->json('');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $utilisateur = Utilisateur::find($id);
        $utilisateur->delete();
        return response()->json('');
    }
}