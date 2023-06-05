<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ImageController;
use App\Http\Controllers\StagiaireController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/







Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

//Authentification
Route::post('/login', [\App\Http\Controllers\AuthController::class, 'login']);
Route::post('/logout', [\App\Http\Controllers\AuthController::class, 'logout'])->middleware('auth:sanctum');

//Administrateur
Route::apiResource('administrateur',\App\Http\Controllers\AdministrateurController::class);

use App\Http\Controllers\MessageController;

Route::post('/messages', [MessageController::class, 'store']);
Route::get('/messages', [MessageController::class, 'index']);


//DemandeStage
Route::apiResource('demandeStage',\App\Http\Controllers\DemandeStageController::class);

//Encadrant
Route::apiResource('encadrant',\App\Http\Controllers\EncadrantController::class);


//image upload
Route::post('/images/upload', [ImageController::class, 'upload']);
Route::get('/images', [ImageController::class, 'index']);



//Absence
Route::apiResource('absence',\App\Http\Controllers\AbsenceController::class);

//Attestation
Route::apiResource('attestation',\App\Http\Controllers\AttestationController::class);

//Avancement
Route::apiResource('avancement',\App\Http\Controllers\AvancementController::class);

//Equipe
Route::apiResource('equipe',\App\Http\Controllers\EquipeController::class);

//Etablissment
Route::apiResource('etablissement',\App\Http\Controllers\EtablissementController::class);

//Mdp_token
Route::apiResource('mdp_token',\App\Http\Controllers\Mdp_tokensController::class);

//Message
Route::apiResource('message',\App\Http\Controllers\MessageController::class);

//participation
Route::apiResource('participation',\App\Http\Controllers\ParticipationController::class);

//Presentation
Route::apiResource('presentation',\App\Http\Controllers\PresentationController::class);

//Projet
Route::apiResource('projet',\App\Http\Controllers\ProjetController::class);

//RapportStage
Route::apiResource('rapportStage',\App\Http\Controllers\RapportStageController::class);

//Reunion
Route::apiResource('reunion',\App\Http\Controllers\ReunionController::class);

//Stage
Route::apiResource('stage',\App\Http\Controllers\StageController::class);

//Stagiaire
Route::apiResource('stagiaire',\App\Http\Controllers\StagiaireController::class);

//Technologie
Route::apiResource('technologie',\App\Http\Controllers\TechnologieController::class);

//User
Route::apiResource('user',\App\Http\Controllers\UserController::class);

//Utilisateur
Route::apiResource('utilisateur',\App\Http\Controllers\UtilisateurController::class);

//Etablissement
Route::apiResource('etablissement',\App\Http\Controllers\EtablissementController::class);
//UtilisationTechnologie
Route::apiResource('utilisationTechnologie',\App\Http\Controllers\UtilisationTechnologieController::class);

//UseFull Requests

//getting stagiaires-with-stage
Route::get('/stagiaires-with-stage', [\App\Http\Controllers\StagiaireController::class, 'getStagiairesWithStage']);


Route::post('/stagiaire/{id}/update-couverture', [\App\Http\Controllers\StagiaireController::class, 'updateCouverture']);

