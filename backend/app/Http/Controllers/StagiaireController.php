<?php

namespace App\Http\Controllers;

use App\Models\Stagiaire;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class StagiaireController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $stagiaire = Stagiaire::all();
        return response()->json($stagiaire);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'nom' => 'required',
            'prenom' => 'required',
            'email' => 'required|email|unique:stagiaire',
            'password' => 'required',
            'telephone' => 'required',
            'dateNaissance' => 'required|date',
            'genre' => 'required',
            'CIN' => 'required|unique:stagiaire',
            'CNE' => 'required|unique:stagiaire',
            'formation' => 'required',
            'image' => 'nullable',
            'couverture' => 'nullable',
        ]);

        $stagiaire = new Stagiaire;
        $stagiaire->nom = $request->input('nom');
        $stagiaire->prenom = $request->input('prenom');
        $stagiaire->email = $request->input('email');
        $stagiaire->password = \Hash::make($request->input('password'));
        $stagiaire->telephone = $request->input('telephone');
        $stagiaire->dateNaissance = $request->input('dateNaissance');
        $stagiaire->genre = $request->input('genre');
        $stagiaire->CIN = $request->input('CIN');
        $stagiaire->CNE = $request->input('CNE');
        $stagiaire->formation = $request->input('formation');

        if ($request->file('image')) {
            $imagePath = $request->file('image')->path();
            $imageFile = file_get_contents($imagePath);
            $stagiaire->image = base64_encode($imageFile);
        }

        if ($request->file('couverture')) {
            $couverturePath = $request->file('couverture')->path();
            $couvertureFile = file_get_contents($couverturePath);
            $stagiaire->couverture = base64_encode($couvertureFile);
        }

        $stagiaire->save();
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $stagiaire = Stagiaire::find($id);
        return response()->json($stagiaire);
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
            'CNE' => 'required',
            'formation' => 'required',
            'image' => 'nullable',
            'couverture' => 'nullable',
        ]);

        $stagiaire = Stagiaire::find($id);
        $stagiaire->nom = $request->input('nom');
        $stagiaire->prenom = $request->input('prenom');
        $stagiaire->email = $request->input('email');
        $stagiaire->password = \Hash::make($request->input('password'));
        $stagiaire->telephone = $request->input('telephone');
        $stagiaire->dateNaissance = $request->input('dateNaissance');
        $stagiaire->genre = $request->input('genre');
        $stagiaire->CIN = $request->input('CIN');
        $stagiaire->CNE = $request->input('CNE');
        $stagiaire->formation = $request->input('formation');

        if ($request->file('image')) {
            $imagePath = $request->file('image')->path();
            $imageFile = file_get_contents($imagePath);
            $stagiaire->image = base64_encode($imageFile);
        }

        if ($request->file('couverture')) {
            $couverturePath = $request->file('couverture')->path();
            $couvertureFile = file_get_contents($couverturePath);
            $stagiaire->couverture = base64_encode($couvertureFile);
        }

        $stagiaire->save();
        return response()->json('');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $stagiaire = Stagiaire::find($id);
        $stagiaire->delete();
        return response()->json('');
    }
}
