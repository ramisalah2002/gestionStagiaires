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
            'status' => 'required',
            'CIN' => 'required|unique:stagiaire',
            'CNE' => 'required|unique:stagiaire',
            'formation' => 'required',
            'image' => 'nullable',
            'couverture' => 'nullable',
            'etablissement_id' => 'nullable',
            'equipe_id'=> 'nullable',
        ]);

        $stagiaire = new Stagiaire;
        $stagiaire->nom = $request->input('nom');
        $stagiaire->prenom = $request->input('prenom');
        $stagiaire->email = $request->input('email');
        $stagiaire->password = \Hash::make($request->input('password'));
        $stagiaire->telephone = $request->input('telephone');
        $stagiaire->dateNaissance = $request->input('dateNaissance');
        $stagiaire->genre = $request->input('genre');
        $stagiaire->status = $request->input('status');
        $stagiaire->CIN = $request->input('CIN');
        $stagiaire->CNE = $request->input('CNE');
        $stagiaire->formation = $request->input('formation');
        $stagiaire->image = $request->input('image');
        $stagiaire->couverture = $request->input('couverture');
        $stagiaire->etablissement_id = $request->input('etablissement_id');
        $stagiaire->equipe_id = $request->input('equipe_id');

        $stagiaire->save();
    }

    public function login(Request $request)
    {
        $fields = $request->validate([
            'email' => 'required|string',
            'password' => 'required|string',
        ]);

        // Check Email
        $stagiaire = Stagiaire::where('email', $fields['email'])->first();

        // Check password
        if (!$stagiaire || !Hash::check($fields['password'], $stagiaire->password)) {
            return response([
                'message' => 'Incorrect informations'
            ], 401);
        }

        $token = $stagiaire->createToken($stagiaire->getTable().'Token')->plainTextToken;

        $response = [
            'stagiaire' => $stagiaire,
            'token' => $token
        ];

        return response($response, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $stagiaire = Stagiaire::with(['etablissement', 'equipe', 'equipe.encadrant', 'equipe.projet'])->find($id);

        return response()->json($stagiaire);
    }




    public function updateCouverture(Request $request, $id)
    {

        $request->validate([
            'couverture' => 'required|string',
        ]);

        $stagiaire = Stagiaire::findOrFail($id);
        $stagiaire->couverture = $request->input('couverture');
        $stagiaire->save();

        return response()->json('Couverture image updated successfully');
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
            'status' => 'required',
            'CIN' => 'required',
            'CNE' => 'required',
            'formation' => 'required',
            'image' => 'nullable',
            'couverture' => 'nullable',
            'etablissement_id' => 'nullable',
            'equipe_id'=> 'nullable',
        ]);

        $stagiaire = Stagiaire::find($id);
        $stagiaire->nom = $request->input('nom');
        $stagiaire->prenom = $request->input('prenom');
        $stagiaire->email = $request->input('email');
        $stagiaire->password = \Hash::make($request->input('password'));
        $stagiaire->telephone = $request->input('telephone');
        $stagiaire->dateNaissance = $request->input('dateNaissance');
        $stagiaire->genre = $request->input('genre');
        $stagiaire->status = $request->input('status');
        $stagiaire->CIN = $request->input('CIN');
        $stagiaire->CNE = $request->input('CNE');
        $stagiaire->formation = $request->input('formation');
        $stagiaire->image = $request->input('image');
        $stagiaire->couverture = $request->input('couverture');
        $stagiaire->etablissement_id = $request->input('etablissement_id');
        $stagiaire->equipe_id = $request->input('equipe_id');
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



    /*
     * API Methods
     */
    public function getStagiairesWithStage()
    {
        $stagiaires = Stagiaire::with('stage')->get();

        foreach ($stagiaires as $stagiaire) {
            if($stagiaire->stage){
                $date_debut = new \DateTime($stagiaire->stage->date_Debut);
                $now = new \DateTime();
                $interval = $now->diff($date_debut);
                $stagiaire->stage->enStage = $interval->days;
            }
        }

        return response()->json($stagiaires);
    }







}
